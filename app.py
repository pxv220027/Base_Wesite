from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example data
    return jsonify({
        "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
        "values": [10, 15, 30, 45, 60]
    })

@app.route('/api/chat', methods=['POST'])
def chat_response():
    user_message = request.json.get('message')
    # Replace this with a Llama-based response logic
    response = f"Echo: {user_message}"  # Example response
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
