from flask import Flask, request
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

@app.route("/")
def yo():
	return "<p>yo mama</p>"

if __name__ == '__main__':
    app.run(debug=True)