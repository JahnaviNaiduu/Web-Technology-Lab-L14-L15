const usernameInput = document.getElementById("username");
const message = document.getElementById("message");
const form = document.getElementById("registerForm");

let isAvailable = false;

usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();

    if (username === "") {
        message.textContent = "";
        return;
    }

    message.textContent = "Checking...";
    
    fetch("users.json")
        .then(response => response.json())
        .then(data => {
            if (data.users.includes(username)) {
                message.textContent = "Username already taken";
                message.className = "error";
                isAvailable = false;
            } else {
                message.textContent = "Username available";
                message.className = "success";
                isAvailable = true;
            }
        })
        .catch(() => {
            message.textContent = "Error checking username";
            message.className = "error";
        });
});

form.addEventListener("submit", (e) => {
    if (!isAvailable) {
        e.preventDefault();
        alert("Cannot submit. Username unavailable.");
    }
});
