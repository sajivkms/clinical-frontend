import pandas as pd
import sys
import json
import math
PATH = "/home/ubuntu/meteor-graphs/imports/data/"
data = sys.argv[1]
df = pd.read_csv(PATH + "ctsummary.csv")
loc_df = pd.read_csv(PATH + 'ctLocation.csv')
def find_rows(string, df, col):
    cont = df[col].str.contains(string)
    keys = cont.keys()
    kts = []
    for i in range(len(keys)):
        if cont[i]:
            kts.append(i)
    return df.iloc[kts]
def find_top_drug(rows):
    dgs = list(rows["prim_drug"])
    drugs = []
    for i in dgs:
        try:
            math.isnan(i)
        except Exception as e:
            if i != 0:
                dg = i.split("|")
                for j in range(len(dg)):
                    dg[j] = dg[j].lower()
                    dg[j] = dg[j].strip()
                drugs.extend(dg)
    d2 = list(set(drugs))
    drug_df = pd.DataFrame(drugs, columns=['A'])
    cts = drug_df["A"].value_counts()
    cdf = pd.DataFrame({'drug':cts.index, 'count':cts.values})
    top10df = cdf.head(10)
    return top10df.values.tolist()
def find_top_agencies(rows):
    cts = rows["lead_agency"].value_counts()
    cdf = pd.DataFrame({'agency':cts.index, 'count':cts.values})
    top10df = cdf.head(10)
    return top10df.values.tolist()
def find_cities(rows, location_df):
    ids = list(set(list(rows["id"])))
    ans = location_df[pd.DataFrame(location_df["id"].tolist()).isin(ids).any(1)]
    cities = list(set(list(ans["city"])))
    cities = [x for x in cities if str(x) != 'nan']
    return cities
rows = find_rows(data, df, "disease")
d = find_top_drug(rows)
cities = find_cities(rows, loc_df)
agen = find_top_agencies(rows)
print(json.dumps([d, agen, cities]))
