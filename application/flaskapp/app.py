# Commented parts not tested, just taken from gfg, supposedly code for integrating model into the app.

from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
#import pandas as pd
#from flask_cors import CORS
#import pickle

load_dotenv()
app = Flask(__name__)

#CORS(app, resources={r"/*":{"origins:"*""}})
#model = pickle.load(open('ml_model.pkl', 'rb'))

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

@app.route("/", methods=['GET'])
def yo():
    data = {"message": "yo mama"}
    return jsonify(data)

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         query_df = pd.Dataframe([data])
#         prediction = model.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)