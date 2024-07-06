import re
import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
import sentence_transformers
from sentence_transformers import SentenceTransformer, losses


# Import LLM from huggingface
model = SentenceTransformer("wjunwei/ecommerce_text_embedding_retrieval_v2")

################ Preprocess data and produce embedding (only need to do once for the entire dataset) ######################3
# df = pd.read_csv("dataset/amazon_sample_data.csv")
# df['description'].replace(np.nan, '', inplace=True)
# df['ecommerce_text'] = df['title'] + ' ' + df['description']
# df['ecommerce_text'] = df['ecommerce_text'].str.lower()
# df['ecommerce_text'] = df['ecommerce_text'].apply(lambda x: re.sub('[^a-z\s]', '', str(x)))
# df['ecommerce_text'] = 'passage: ' + df['ecommerce_text']

# # Get text embeddings of all products beforehand to avoid latency problem
# df['product_embedding'] = df['ecommerce_text'].apply(lambda x: model.encode(x).tolist())
# df.to_csv('dataset/amazon_sample_data_encoded.csv')

new_df = pd.read_csv('amazon_data/amazon_data_encoded.csv')

def calculate_similarity(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])

def llm_similarity_score(df, model, recipient, style):
    user_input = f"query: Does this product meet the needs of a {recipient} who is looking for {style} products?"
    user_input_embedding = model.encode(user_input)

    similarities = []
    for product_embedding in df['product_embedding']:
        similarity = calculate_similarity(user_input_embedding, product_embedding)
        similarities.append(similarity)
    
    df['similarity_score'] = similarities
    return df

#### Example usage
# df = llm_similarity_score(df, model, "mother", "minimalistic") 



########################## API method (not used) ######################
# import requests
# API_URL = "https://api-inference.huggingface.co/models/wjunwei/ecommerce_text_embedding_retrieval_v2"
# headers = {"Authorization": "Bearer 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"}

# def query_similarity(source_sentence, sentences):
#     response = requests.post(API_URL, headers=headers, json={
#         "inputs": {
#             "source_sentence": source_sentence,
#             "sentences": sentences
#         }
#     })
#     return response.json()

# def get_similarity_scores(user_input, products):
#     product_list = products.tolist()
#     similarities = query_similarity(user_input, product_list)
#     return [score['score'] for score in similarities]
###################################################################