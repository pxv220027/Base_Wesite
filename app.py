from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load LLaMA or any other model you wish to use
chatbot_pipeline = pipeline("text-generation", model="huggingface/llama-model")

@app.route('/api/chat', methods=['POST'])
def chat_response():
    user_message = request.json.get('message')
    response = chatbot_pipeline(user_message, max_length=100, num_return_sequences=1)
    return jsonify({"response": response[0]['generated_text']})

if __name__ == '__main__':
    app.run(debug=True)
