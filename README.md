# Paloma Coding Challenge: Movie Library Manager

## Setup

### Install and Run Backend Development Server

(from the root directory)
```bash
cd flask-backend
python3 -m venv venv
. venv/bin/activate
pip install Flask
export FLASK_APP=app.py
flask run
```

To restart the backend server after making code changes later on, you only need to run...
```bash
cd flask-backend
. venv/bin/activate
export FLASK_APP=app.py
flask run
```

### Install and Run Frontend Development Server

If you don’t have Node.js installed, (install it from here)[https://nodejs.org/en/]. You’ll need Node.js version 10.13 or later.

(from the root directory)
```bash
npm ci
npm run dev
```

Then navigate to (http://localhost:3000)[http://localhost:3000] to see the app.

### Frameworks Used & Relevant Documentation

* Flask
* Tailwind
* NextJS
* React Query