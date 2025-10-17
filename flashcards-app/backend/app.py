import os
from flask import Flask, request, jsonify, render_template
from openai import OpenAI
from fc import analyse_text

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    user_text = data.get("message")

    print("Received via fetch:", user_text)

    if not user_text:
        return "received"
    
    result = analyse_text(user_prompt=user_text)
    return result

app.run(host="0.0.0.0", port=5000)