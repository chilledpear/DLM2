document.getElementById("user-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

document.getElementById("send-btn").addEventListener("click", sendMessage);

const themeToggleBtn = document.getElementById("theme-toggle-btn");
themeToggleBtn.addEventListener("click", toggleDarkMode);

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    displayMessage("Ice", userInput);
    document.getElementById("user-input").value = "";

    fetchChatGPTResponse(userInput).then((response) => {
      displayMessage("deported latina", response);  // Chatbot persona is now "deported"
    });
  }
}

function displayMessage(sender, message) {
  const chatDisplay = document.getElementById("chat-display");
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

async function fetchChatGPTResponse(userInput) {
  try {
    const baseUrl = window.location.origin;
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return 'Oh fuck, Im deported';
  }
}

function toggleDarkMode() {
  const body = document.body;
  const centerImage = document.getElementById("center-image");

  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    centerImage.src = "dlm-dark.jpg";
    themeToggleBtn.textContent = "Toggle Light Mode";
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    centerImage.src = "dlm-light.jpg";
    themeToggleBtn.textContent = "Deport Her";
  }
}
