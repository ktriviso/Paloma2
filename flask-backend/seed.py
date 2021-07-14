import os
from queries import put_data

filename = os.path.join(app.root_path, 'titles.json')
with open(filename) as file:
    mock_data = json.load(file)

    map(put_data, mock_data)