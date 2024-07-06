from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, losses
#import pandas as pd
#from flask_cors import CORS
import pickle
import json
from recommender import final_recommend

load_dotenv()
app = Flask(__name__)

#CORS(app, resources={r"/*":{"origins:"*""}})

# LOAD ALL NECESSARY MODELS
llm = SentenceTransformer("wjunwei/ecommerce_text_embedding_retrieval_v2")
with open('dataset/network_theory.pickle', 'rb') as fe_data_file:
    G = pickle.load(fe_data_file)
with open('dataset/betweenness_centrality.json', 'r') as json_file:
    BETWEENNESS_CENTRALITY = json.load(json_file)

#EXAMPLE USAGE 
# result = final_recommend(df, G, BETWEENNESS_CENTRALITY, user_input, llm)

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