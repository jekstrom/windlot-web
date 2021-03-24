import os
import traceback
import json
import boto3

def lambda_handler(event, context):
    print("Start")

    print(event)

    body = event.get('body', '{}')

    print("Body: ")
    print(body)

    if not body:
        print("No body in event.")
        return None

    try:
        # upload image to s3

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': ""
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