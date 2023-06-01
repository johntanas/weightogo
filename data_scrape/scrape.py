import requests
import sqlite3
from get_data import insert_food
import time,sys
import pandas as pd
root="https://www.myfitnesspal.com/nutrition-facts-calories/"
df=pd.read_csv("nutrients_csvfile.csv")
c=0
for i in df['Food']:
    query=i
    print(i)
    con = sqlite3.connect("data.db")
    cur = con.cursor()
    html_doc= requests.get(root+query).content
    insert_food(con,html_doc)
    for i in range(2,10):
        html_doc= requests.get(root+query+"/"+str(i)).content
        insert_food(con,html_doc)
        time.sleep(3)