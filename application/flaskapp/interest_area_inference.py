import spacy
import numpy as np
import pandas as pd
import networkx as nx

def recommend_products(given_wishlist, G, BETWEENNESS_CENTRALITY, overall_data):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(given_wishlist.strip())
    sub_category_list_2 = list(overall_data['sub_category_2'].str.lower().unique())
    result_categories = []
    
    for token in reversed(doc):
        if token.text in list(G.nodes()):
            closeness_centrality_list = []
            betweness_centrality_list = []
            neighbor_list = []
            shortest_path_list = []
            length_list = []
            
            for neighbor in list(G.neighbors(token.text)):
                if neighbor in sub_category_list_2:
                    neighbor_list.append(neighbor)
                    betweness_centrality_list.append(BETWEENNESS_CENTRALITY[neighbor])
                    shortest_path = nx.shortest_path(G, source=neighbor, target=token.lemma_)
                    shortest_path_list.append(len(shortest_path))
                    length_list.append(overall_data[overall_data['sub_category_2'] == neighbor].shape[0])
                    
            network_result = pd.DataFrame(neighbor_list, columns=['neighbor'])
            network_result['betweenness_centrality'] = betweness_centrality_list
            network_result['shortest_path'] = shortest_path_list
            
            if betweness_centrality_list:
                if network_result[network_result['shortest_path'] == min(shortest_path_list)]['neighbor'].shape[0] < 2:
                    if list(network_result[network_result['shortest_path'] == min(shortest_path_list)]['neighbor'])[0] not in result_categories:
                        result_categories.append(list(network_result[network_result['shortest_path'] == min(shortest_path_list)]['neighbor'])[0])
                else:
                    if list(network_result[network_result['betweenness_centrality'] == min(betweness_centrality_list)]['neighbor'])[0] not in result_categories:
                        result_categories.append(list(network_result[network_result['betweenness_centrality'] == min(betweness_centrality_list)]['neighbor'])[0])
    
    merge_products = []
    for result_category in result_categories:
        merge_products.append(overall_data[overall_data['sub_category_2'] == result_category.title()])
    
    selected_category = pd.concat(merge_products).reset_index()
    
    return selected_category