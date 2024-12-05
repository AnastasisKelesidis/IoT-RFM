console.log("Smart Farm Monitoring dashboard loaded.");

// Select the toggle switch
const toggleSwitch = document.getElementById("toggle-switch");

function getButtonState() {
    console.log("Attempting to fetch button state...");
    fetch('/get_button', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Response received. Parsing...");
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data); // Ensure the JSON data is logged
            if (data.button_state === 1 || data.button_state === 0) {
                console.log(`Setting toggleSwitch to ${data.button_state === 1 ? "open" : "closed"}`);
                toggleSwitch.checked = data.button_state === 1;
            } else {
                console.error("Invalid button state received:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching button state:", error);
        });
}

// Function to update the button state on the server
function updateButtonState(state) {
    fetch('/update_button', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: state }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error("Error updating button state:", error);
        });
}

// Add event listener for the toggle switch
toggleSwitch.addEventListener("change", () => {
    const state = toggleSwitch.checked ? 1 : 0;
    console.log("Toggled switch to:", state);
    updateButtonState(state);
});

// Fetch the initial state from the server when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded. Fetching initial button state...");
    getButtonState();
});
