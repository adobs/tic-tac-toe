"""
server.py

File contains all routes for Flask app
"""

from flask import Flask, request, render_template, jsonify
from jinja2 import StrictUndefined
import os

app = Flask(__name__)

app.secret_key = os.environ.get("FLASK_SECRET_KEY", "ABCDEF")
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def home():
    """ Home page """

    return render_template("index.html")


if __name__ == "__main__":
    
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = "NO_DEBUG" not in os.environ

    app.run(debug=DEBUG, host="0.0.0.0", port=PORT)
