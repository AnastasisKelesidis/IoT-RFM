console.log("Smart Farm Monitoring dashboard loaded.");

// Select the toggle switch
const toggleSwitch = document.getElementById("toggle-switch");

// Function to update the button state on the server
function updateButtonState(state) {
    fetch('/update_button', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: state }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error("Error updating button state:", error);
    });
}

// Event listener for toggle switch
toggleSwitch.addEventListener("change", function () {
    const state = toggleSwitch.checked ? 1 : 0; // 1 if checked, 0 otherwise
    updateButtonState(state);
});

// Function to fetch the current button state from the server
function getButtonState() {
    fetch('/get_button', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log("Current button state:", data.button_state);
        toggleSwitch.checked = data.button_state === 1; // Update toggle switch UI
    })
    .catch(error => {
        console.error("Error fetching button state:", error);
    });
}

// Fetch the initial state when the page loads
getButtonState();