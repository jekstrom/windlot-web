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

        s = Search(using=es, index="listings")
        query_text = body.get("queryText")

        if query_text:
            search = s.query("match", name=query_text)
        else:
            search = s.query("match_all")

        search_results = search.execute()

        print("Got %d Hits:" % search_results['hits']['total']['value'])

        results = {}
        results["count"] = search_results['hits']['total']['value']
        results["items"] = []
        for hit in search_results['hits']['hits']:
            print(f"hit: {hit['_source']}")
            results["items"] += [hit.to_dict()]

            
        print(search_results)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(results)
        }
    except Exception as ex:
        print("Could not search: " + str(ex))
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