import os
from flask import Flask, render_template, json, current_app as app

app = Flask(__name__)

filename = os.path.join(app.root_path, 'data.json')
with open(filename) as file:
    mock_data = json.load(file)

@app.route('/api/content', methods=["GET"])
def index():
    return mock_data
