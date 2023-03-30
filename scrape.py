from bs4 import BeautifulSoup
import requests
import time
import os
import re
filename= "data"
if not os.path.exists(filename):
    os.makedirs(filename)
html_doc = open(filename+".html", "rb")
soup = BeautifulSoup(html_doc, 'html.parser')
for i in soup.findAll('a',{"class":"MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineNone css-1k8z5lp"}):
    print(i.prettify())