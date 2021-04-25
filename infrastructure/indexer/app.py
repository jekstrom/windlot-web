import os
import hashlib
import traceback
import json
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import boto3

def lambda_handler(event, context):
    print("Start")
    host = os.environ["ElasticsearchDomain"]
    region = os.environ["AWS_REGION"]

    service = 'es'
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

    body = json.loads(event.get('body', '{}'))

    print("Body: ")
    print(body)

    print(event['requestContext'])

    if not body:
        print("No body in event.")
        return None

    try:
        name = body['name']
        description = body['description']
        contact_info = event['requestContext']['authorizer']['claims']['email']
        # TODO: Fix this lame hack lol. Have database of available countries and states
        location_country = body['locationCountry']
        location_state = "Washington" if body['locationState'] == "1" else "Minnesota"
        location_points = body['locationPoints']
        game_types = body['gameTypes']
        amenities = body['amenities']
        # TODO: Fix time zones on dates. 
        # Store all dates as UTC and convert to local time zone client side.
        availability_start = body['availabilityStart']
        availability_end = body['availabilityEnd']
        timezone_offset_ms = body['timezoneOffset']
        price = float(body['price'])
        image_key = body['imageKey']
        user_id = body['userId']

        es = Elasticsearch(
            hosts = [{'host': host, 'port': 443}],
            http_auth = awsauth,
            use_ssl = True,
            verify_certs = True,
            connection_class = RequestsHttpConnection
        )

        # TODO: Set cloudfront domain with env variable.
        image_url = f"https://d313fgcudovroe.cloudfront.net/{user_id}/{image_key}"

        document = {
            "name": name,
            "description": description,
            "contact_info": contact_info,
            "location": {
                "coordinates": location_points,
                "country": "United States",
                "state": location_state
            },
            "availability": {
                "start": availability_start,
                "end": availability_end,
                "timezoneOffsetMs": timezone_offset_ms
            },
            "gameTypes": game_types,
            "amenities": amenities,
            "price": price,
            "imageUrl": image_url
        }

        print("Document: ")
        print(document)

        document_id = hashlib.md5(f"{name}_{contact_info}".encode()).hexdigest()

        print(f"document_id: {document_id}")

        es.index(index="listings", doc_type="_doc", id=document_id, body=document)

        indexed_object = es.get(index="listings", doc_type="_doc", id=document_id)
        print(indexed_object)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(indexed_object)
        }
    except Exception as ex:
        print("Could not index new listing: " + str(ex))
        traceback.print_stack()
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': "error"
        }