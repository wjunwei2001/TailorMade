import numpy as np
import pandas as pd
import pickle
import json
from interest_area_inference import recommend_products
from similarity_score_inference import calculate_similarity, llm_similarity_score
from sentence_transformers import SentenceTransformer, losses
from sklearn.preprocessing import MinMaxScaler

def final_recommend(df, G, BETWEENNESS_CENTRALITY, user_input, llm):
    # Extract user input
    max_delivery_time = user_input["time"]
    user_location = user_input["location"]
    price_preference = user_input["price_preference"] # 1 for competitively priced, 0 for more expensive
    recipient = user_input["recipient"]
    design_style = user_input["design_style"]
    trendiness_or_unique = user_input["trendiness_or_unique"] # 1 for trendy, 0 got unique
    interest_area = user_input["interest_area"]

    # Filter out those who are not available
    df.dropna(subset=['is_available'], inplace=True)
    df = df[~df['is_available'].isin(["Not Available", "Temporarily out of stock."])]

    # Filter out products which does not meet time and location requirements
    user_location = "deliver_to_" + user_location
    df = df[df[user_location] != "no"]
    df = df[df["delivery_time"] <= max_delivery_time]

    # Pick out products based on interest area
    df = recommend_products(interest_area, G, BETWEENNESS_CENTRALITY, df)

    # Rank products based on similarity score
    df = llm_similarity_score(df, llm, recipient, design_style)
    scaler = MinMaxScaler()
    df[['similarity_score', 'predicted_trendiness', 'predicted_uniqueness']] = scaler.fit_transform(df[['similarity_score', 'predicted_trendiness', 'predicted_uniqueness']])
    if trendiness_or_unique == 1:
        df["ranking_score"] = df["similarity_score"] * df["predicted_trendiness"]
    else:
        df["ranking_score"] = df["similarity_score"] * df["predicted_uniqueness"]
    df = df.sort_values(by=["ranking_score"], ascending=False).reset_index(drop=True)

    # Filter by price preference 
    df["price"] = df["sale_price"].fillna(df["original_price"])
    df["price"] = df["price"].str.replace(',', '').str.replace('$', '').astype(float)
    df["average_price"] = df.groupby("sub_category_2")["price"].transform("mean") # average price is computed within each sub category 2 to find out whether a product is below or above market average
    if price_preference == 1: # user wants competitively priced
        df = df[df['price'] >= df['average_price']]
    else:
        df = df[df['price'] <= df['average_price']]

    return df



################## TESTING ##########################
# user_input = {"interest_area": "gaming",
#               "trendiness_or_unique": 1, # 1 for trendy, 0 for unique
#               "design_style": "minimalistic",
#               "recipient": "teenage friend",
#               "price_preference": 1,  # 1 for competitively priced, 0 for more expensive
#               "location": "singapore", # right now just singapore or malaysia
#               "time": 7, # integer in number of days 
#               }

# df = pd.read_csv("dataset/product_sample.csv")
# llm = SentenceTransformer("wjunwei/ecommerce_text_embedding_retrieval_v2")
# with open('dataset/network_theory.pickle', 'rb') as fe_data_file:
#     G = pickle.load(fe_data_file)
# with open('dataset/betweenness_centrality.json', 'r') as json_file:
#     BETWEENNESS_CENTRALITY = json.load(json_file)

# result = final_recommend(df, G, BETWEENNESS_CENTRALITY, user_input, llm)
# print(result)
# result.to_csv("test.csv")