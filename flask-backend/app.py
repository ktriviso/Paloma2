import os
from flask import Flask, render_template, json, current_app as app
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
    return {'entries': filtered_items}

@app.route('/api/movies', methods=["GET"])
@cross_origin(supports_credentials=True)
def movies():
    filtered_items = list(filter(lambda x: x['programType'] == 'movie', mock_data['entries']))
    return {'entries': filtered_items}
