import os
from flask import Flask, render_template, json, current_app as app
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

filename = os.path.join(app.root_path, 'titles.json')
with open(filename) as file:
    mock_data = json.load(file)

@app.route('/api/content', methods=["GET"])
@cross_origin(supports_credentials=True)
def index():
    return mock_data
