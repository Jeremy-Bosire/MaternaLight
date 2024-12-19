async function fetchChatbotResponse(input) {
  try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI("AIzaSyCEw-YWTkoabhGqnNY2a9cK38bKMhZnwXg"); // Gemini API key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Send the user's input as the prompt to the model
      const result = await model.generateContent(input);

      console.log(result); // Log the full response to inspect its structure

      // Return the text response from the API
      return result.response.text || "Sorry, I couldn't understand that.";
  } catch (error) {
      console.error("Error fetching chatbot response:", error);
      if (error.response) {
          console.error("API response error:", error.response);
      }
      return "An error occurred while fetching the response.";
  }
}


// Display the user message on the chat
function displayUserMessage(message) {
    let chat = document.getElementById("chat");
    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.classList.add("user");
    let userAvatar = document.createElement("div");
    userAvatar.classList.add("avatar");
    let userText = document.createElement("div");
    userText.classList.add("text");
    userText.innerHTML = message;
    userMessage.appendChild(userAvatar);
    userMessage.appendChild(userText);
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;
}

// Display the bot message on the chat
function displayBotMessage(message) {
    let chat = document.getElementById("chat");
    let botMessage = document.createElement("div");
    botMessage.classList.add("message");
    botMessage.classList.add("bot");
    let botAvatar = document.createElement("div");
    botAvatar.classList.add("avatar");
    let botText = document.createElement("div");
    botText.classList.add("text");
    botText.innerHTML = message;
    botMessage.appendChild(botAvatar);
    botMessage.appendChild(botText);
    chat.appendChild(botMessage);
    chat.scrollTop = chat.scrollHeight;
}

// Send the user message and get the bot response
async function sendMessage() {
    let input = document.getElementById("input").value;
    if (input) {
      displayUserMessage(input);
      const output = await fetchChatbotResponse(input);
      setTimeout(function() {
        displayBotMessage(output);
      }, 1000);
      document.getElementById("input").value = "";
    }
  }

// Add a click event listener to the button
document.getElementById("button").addEventListener("click", sendMessage);

// Add a keypress event listener to the input
document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
    sendMessage();
    }
});