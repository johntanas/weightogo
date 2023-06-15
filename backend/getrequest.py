import requests,json
test=json.dumps({'url':"https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg"})
out = requests.post("https://godoscar.pythonanywhere.com/something",data=test)
print(out)
print(out.content)