import os
import traceback
import hashlib
import json
import boto3
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    print("Start")
    host = os.environ["ElasticsearchDomain"]
    region = os.environ["AWS_REGION"]

    body = json.loads(event.get('body', '{}'))

    print("Body: ")
    print(body)

    service = 'es'
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

    hunter_contact_table_name = os.environ['HUNTERCONTACTS_TABLE']
    dynamodb = boto3.resource('dynamodb', region_name="us-west-2")
    hunter_contact_table = dynamodb.Table(hunter_contact_table_name)

    es = Elasticsearch(
        hosts = [{'host': host, 'port': 443}],
        http_auth = awsauth,
        use_ssl = True,
        verify_certs = True,
        connection_class = RequestsHttpConnection
    )

    if not body:
        print("No body in event.")
        return None

    try:
        hunter_name = body.get("hunterName")
        message = body.get("message")
        user_id = body.get("userId")
        listing_id = body.get("listingId")
        email = body.get("email")

        if not user_id or not listing_id:
            raise Exception("No user id or no listing id.")

        contact_id = hashlib.md5(f"{user_id}_{listing_id}".encode()).hexdigest()
        
        listing_details = es.get(index="listings", doc_type="_doc", id=listing_id)

        print("listing details:")
        print(listing_details)

        contact_email = listing_details.get("_source", {}).get("contact_info")
        print(f"contact_info: {contact_email}")

        hunter_contact_item = {
            "ContactID": contact_id,
            "hunterName": hunter_name,
            "message": message,
            "listingId": listing_id,
            "contactEmail": contact_email,
            "responseEmail": email
        }

        hunter_contact_table.put_item(
            Item=hunter_contact_item
        )

        contact = hunter_contact_table.query(
            KeyConditionExpression=Key('ContactID').eq(contact_id)
        ).get('Items', [])

        # Get the listing details from es

        # send email?

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(contact)
        }
    except Exception as ex:
        print("Could not store new message: " + str(ex))
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