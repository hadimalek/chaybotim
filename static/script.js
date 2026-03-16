const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");

// Generate a simple session ID
const sessionId =
  "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);

function addMessage(content, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";
  contentDiv.textContent = content;

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message bot-message";
  messageDiv.id = "typingIndicator";

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content typing-indicator";
  contentDiv.innerHTML = "<span></span><span></span><span></span>";

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typingIndicator");
  if (indicator) indicator.remove();
}

async function sendMessage(message) {
  sendBtn.disabled = true;
  addMessage(message, true);
  addTypingIndicator();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, session_id: sessionId }),
    });

    const data = await response.json();
    removeTypingIndicator();

    if (data.error) {
      addMessage("خطا: " + data.error, false);
    } else {
      addMessage(data.response, false);
    }
  } catch {
    removeTypingIndicator();
    addMessage("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.", false);
  }

  sendBtn.disabled = false;
  userInput.focus();
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  userInput.value = "";
  sendMessage(message);
});

resetBtn.addEventListener("click", async () => {
  try {
    await fetch("/api/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
  } catch {
    // Ignore reset errors
  }

  chatMessages.innerHTML = "";
  addMessage(
    "سلام! من مشاور شما در زمینه ثبت شرکت و ویزای امارات هستم. چطور می‌تونم کمکتون کنم؟",
    false,
  );
});
