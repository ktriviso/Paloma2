import boto3

def query_data(year, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('Posters')
    response = table.query(
        KeyConditionExpression=Key('programType').eq(programType)
    )
    return response['Items']

def put_data(title, description, programType, url, width, height, releaseYear, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('Posters')
    response = table.put_item(
       Item={
           "title": title,
            "description": description,
            "programType": programType,
            "images": {
                "Poster Art": {
                    "url": url,
                    "width": width,
                    "height": height
                }
            },
            "releaseYear": releaseYear
            }
        }
    )
    return response