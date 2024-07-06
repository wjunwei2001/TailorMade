import spacy
import numpy as np
import pandas as pd
import networkx as nx

def recommend_products(given_wishlist, G, BETWEENNESS_CENTRALITY, overall_data):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(given_wishlist.strip())
    sub_category_list_2 = list(overall_data['sub_category_2'].str.lower().unique())
    result_categories = set()  # Use a set to avoid duplicates

    for token in doc:
        if token.text in G.nodes():
            neighbors = [neighbor for neighbor in G.neighbors(token.text) if neighbor in sub_category_list_2]
            
            if neighbors:
                # Sort neighbors by betweenness centrality for lenient inclusion
                neighbors.sort(key=lambda x: -BETWEENNESS_CENTRALITY[x])
                
                # Select top N neighbors to include more products
                top_neighbors = neighbors[:10]  # Adjust the number of top neighbors as needed
                
                for neighbor in top_neighbors:
                    result_categories.add(neighbor)
    
    # Convert set to list to ensure more categories are included
    result_categories = list(result_categories)

    # If too few categories are found, expand to more neighbors
    if len(result_categories) < 20:  # Adjust this threshold as needed
        for token in doc:
            if token.text in G.nodes():
                additional_neighbors = [neighbor for neighbor in G.neighbors(token.text) if neighbor not in result_categories]
                
                for neighbor in additional_neighbors:
                    if neighbor in sub_category_list_2:
                        result_categories.append(neighbor)
                    if len(result_categories) >= 20:
                        break
            if len(result_categories) >= 20:
                break
    
    # Collect all products from the selected categories
    merge_products = [overall_data[overall_data['sub_category_2'] == result_category.title()] for result_category in result_categories]
    selected_category = pd.concat(merge_products).reset_index(drop=True)
    
    return selected_category