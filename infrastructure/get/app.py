import os
import hashlib
import traceback
import json
from elasticsearch import Elasticsearch, RequestsHttpConnection
from elasticsearch_dsl import Search
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
    listing_id = body.get("listingId")

    print("Body: ")
    print(body)

    if not body:
        print("No body in event.")
        return None

    try:
        es = Elasticsearch(
            hosts = [{'host': host, 'port': 443}],
            http_auth = awsauth,
            use_ssl = True,
            verify_certs = True,
            connection_class = RequestsHttpConnection
        )

        indexed_object = es.get(index="listings", doc_type="_doc", id=listing_id)
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
        print(f"Could not get listing {listing_id}: " + str(ex))
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