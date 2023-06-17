import requests,json
url = "https://www.foodgem.sg/wp-content/uploads/2016/06/IMG_1805.jpg"
baseurl='http://127.0.0.1:105/'
out=requests.post(baseurl+'predict',json={'url':url})
print(out)
print(out.json())