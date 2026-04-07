import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    res = requests.post(
        'https://api.groq.com/openai/v1/chat/completions',
        headers={
            'Authorization': f"Bearer {os.environ.get('GROQ_API_KEY')}",
            'Content-Type': 'application/json'
        },
        json={
            'model': 'llama3-8b-8192',
            'max_tokens': 300,
            'messages': data['messages']
        }
    )
    return jsonify(res.json())

if __name__ == '__main__':
    app.run()