from flask import Flask, request, jsonify
from flask_cors import CORS
import llama_cpp

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"response": "Invalid input"}), 400

    # Initialize LLaMA model or other LLM setup here
    response = llama_cpp.generate_response(user_input)

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
