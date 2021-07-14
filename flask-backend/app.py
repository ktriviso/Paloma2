import os
from flask import Flask, render_template, json, request, current_app as app
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

filename = os.path.join(app.root_path, 'titles.json')
with open(filename) as file:
    mock_data = json.load(file)

@app.route('/api/tv', methods=["GET"])
@cross_origin(supports_credentials=True)
def series():
    filtered_items = list(filter(lambda x: x['programType'] == 'series', mock_data['entries']))
    search_string = request.args.get('search')

    if(search_string and len(search_string)):
        filtered_items = list(filter(lambda x: search_string in x['title'].lower() or search_string in x['description'].lower(), filtered_items))

    if(len(filtered_items)):
        return {'entries': filtered_items}
    return {'response': 404, 'entries': filtered_items}

@app.route('/api/movies', methods=["GET"])
@cross_origin(supports_credentials=True)
def movies():
    filtered_items = list(filter(lambda x: x['programType'] == 'movie', mock_data['entries']))
    search_string = request.args.get('search')

    if(search_string and len(search_string)):
        filtered_items = list(filter(lambda x: search_string in x['title'].lower() or search_string in x['description'].lower(), filtered_items))

    if(len(filtered_items)):
        return {'entries': filtered_items}
    return {'response': 404, 'entries': filtered_items}

@app.route('/api/new', methods=["POST"])
@cross_origin(supports_credentials=True)
def new():
    json_data = request.get_json(force=True)
    mock_data['entries'].append(json_data['params'])
    json.dump(mock_data, open(filename,"w"))

    # save json_data
    # return actual response from db
    return {'response': 200}
