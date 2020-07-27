# importing Dependencies
import os
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html") #return the homepage


if __name__ == "__main__":
    app.run(debug=True)


















