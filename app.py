from flask import Flask, request, jsonify, send_file, send_from_directory
import os
import json

app = Flask(__name__, static_folder='.')

# Global variable to store the button state
BUTTON_STATE_FILE = 'button_state.json'

# Serve index.html from the frontend folder
@app.route('/')
def index():
    return send_file(os.path.join(os.path.dirname(__file__), 'index.html'))

# Serve static files (CSS, JS, etc.) from the frontend folder
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), '.'), filename)

#####################################################
def load_button_state():
    if os.path.exists(BUTTON_STATE_FILE):
        with open(BUTTON_STATE_FILE, 'r') as file:
            return json.load(file).get('state', 0)
    return 0

def save_button_state(state):
    with open(BUTTON_STATE_FILE, 'w') as file:
        json.dump({'state': state}, file)

button_state = load_button_state()

# Endpoint to update the button state (POST)
@app.route('/update_button', methods=['POST'])
def update_button():
    global button_state
    data = request.json
    button_state = data.get('state', 0)
    save_button_state(button_state)
    return jsonify({"message": "Button state updated", "button_state": button_state})

# Endpoint to retrieve the button state (GET)
@app.route('/get_button', methods=['GET'])
def get_button():
    return jsonify(button_state)

@app.route('/debug', methods=['GET'])
def debug_state():
    global button_state
    app.logger.info(f"Debugging button state: {button_state}")
    return jsonify(button_state)

if __name__ == '__main__':
    app.run(debug=True)