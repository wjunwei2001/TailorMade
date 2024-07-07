from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, losses
import certifi
from flask_cors import CORS
import pickle
import json
from recommender import final_recommend
# After setting up virtual environment, run 'pip install -r requirements.txt',
# after that, run 'python -m spacy download en_core_web_sm'

load_dotenv()
app = Flask(__name__)

CORS(app, resources={r"/*":{"origins":"*"}})

# LOAD ALL NECESSARY MODELS
llm = SentenceTransformer("wjunwei/ecommerce_text_embedding_retrieval_v2")
with open('../../dataset/network_theory.pickle', 'rb') as fe_data_file:
    G = pickle.load(fe_data_file)
with open('../../dataset/betweenness_centrality.json', 'r') as json_file:
    BETWEENNESS_CENTRALITY = json.load(json_file)

#EXAMPLE USAGE 
# result = final_recommend(df, G, BETWEENNESS_CENTRALITY, user_input, llm)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client['test']
collection = db['products']
data = list(collection.find())
product_data_df = pd.DataFrame(data)
product_data_df = product_data_df.drop(columns='_id')

@app.route("/", methods=['GET'])
def yo():
    data = {"message": "yo"}
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        prediction = final_recommend(product_data_df, G, BETWEENNESS_CENTRALITY, data, llm)
        return prediction.to_json(orient='records')
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
    app.run(host='0.0.0.0')