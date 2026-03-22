"""Residency24 - UAE Visa, Company Registration & Property Sales Chatbot."""

import os

from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from openai import OpenAI

from knowledge_base import SYSTEM_PROMPT

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Store conversation history per session (in-memory, for demo purposes)
conversations: dict[str, list[dict]] = {}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    session_id = data.get("session_id", "default")

    if not user_message:
        return jsonify({"error": "پیام خالی است"}), 400

    if session_id not in conversations:
        conversations[session_id] = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]

    conversations[session_id].append({"role": "user", "content": user_message})

    # Keep conversation history manageable (last 20 messages + system prompt)
    messages = conversations[session_id]
    if len(messages) > 21:
        messages = [messages[0]] + messages[-20:]
        conversations[session_id] = messages

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,
            max_tokens=1000,
        )
        assistant_message = response.choices[0].message.content
        conversations[session_id].append(
            {"role": "assistant", "content": assistant_message}
        )
        return jsonify({"response": assistant_message})
    except Exception as e:
        return jsonify({"error": f"خطا در ارتباط با سرور: {str(e)}"}), 500


@app.route("/api/reset", methods=["POST"])
def reset():
    data = request.get_json()
    session_id = data.get("session_id", "default")
    conversations.pop(session_id, None)
    return jsonify({"message": "مکالمه پاک شد"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
