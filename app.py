from flask import Flask, request, jsonify, send_file, send_from_directory
import os

app = Flask(__name__, static_folder='.')

# Global variable to store the button state
button_state = 0

# Serve index.html from the frontend folder
@app.route('/')
def index():
    return send_file(os.path.join(os.path.dirname(__file__), 'index.html'))

# Serve static files (CSS, JS, etc.) from the frontend folder
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), '.'), filename)

# Endpoint to update the button state (POST)
@app.route('/update_button', methods=['POST'])
def update_button():
    global button_state
    data = request.json
    button_state = data.get('state', 0)
    return jsonify({"message": "Button state updated", "button_state": button_state})

# Endpoint to retrieve the button state (GET)
@app.route('/get_button', methods=['GET'])
def get_button():
    return jsonify(button_state)

if __name__ == '__main__':
    app.run(debug=True)
