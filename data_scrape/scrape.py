from bs4 import BeautifulSoup
import requests
import sqlite3
from get_data import insert_food
import time
root="https://www.myfitnesspal.com/nutrition-facts-calories/"
query="mcdonald"
con = sqlite3.connect("data.db")
cur = con.cursor()
html_doc= requests.get(root+query).content
insert_food(con,html_doc)
for i in range(2,10):
    html_doc= requests.get(root+query+"/"+str(i)).content
    insert_food(con,html_doc)
    time.sleep(3)