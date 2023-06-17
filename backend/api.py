from flask import Flask, request, Response, jsonify
import requests
from transformers import ViTImageProcessor, SwinForImageClassification
from PIL import Image

feature_extractor = ViTImageProcessor.from_pretrained("skylord/swin-finetuned-food101")
model = SwinForImageClassification.from_pretrained("skylord/swin-finetuned-food101")


app = Flask(__name__)

@app.route('/', methods=['GET'])
def welcome():
    return "Hello World!"

@app.route("/predict", methods=["POST"])
def generate_response():
    req_json = request.get_json()
    url = req_json["url"]
    image = Image.open(requests.get(url, stream=True).raw)
    inputs = feature_extractor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    out=model.config.id2label[predicted_class_idx]
    print("Predicted class:",  out)
    return jsonify({"prediction":  out})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)