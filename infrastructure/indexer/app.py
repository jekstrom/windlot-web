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

    if not body:
        print("No body in event.")
        return None

    try:
        name = body['name']
        description = body['description']
        contact_info = body['contactInfo']
        location = body['location']
        game_type = body['gameType']
        amenities = body['amenities']
        price = float(body['price'])

        es = Elasticsearch(
            hosts = [{'host': host, 'port': 443}],
            http_auth = awsauth,
            use_ssl = True,
            verify_certs = True,
            connection_class = RequestsHttpConnection
        )

        document = {
            "name": name,
            "description": description,
            "contact_info": contact_info,
            "location": location,
            "gameType": game_type,
            "amenities": amenities,
            "price": price
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