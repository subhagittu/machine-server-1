const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 8080;

// ─── Serve static files ───────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── Predefined Responses (same logic as server.js) ──────────────────────────
const responses = {
  hello: 'Hello from server! 👋 Great to hear from you!',
  hi: 'Hi there! 😊 How can I help you today?',
  hey: "Hey! Welcome to the Host-Server. What's up?",
  'how are you': "I'm doing great, thanks for asking! The server is running smoothly. 🚀",
  'what is your name': "I'm the Host-Server, your friendly web chat server! 🖥️",
  'what can you do': 'I can respond to your messages! Try: hello, hi, hey, how are you, time, date, joke, help.',
  joke: 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂',
  bye: 'Goodbye! It was nice chatting with you. See you next time! 👋',
  exit: 'Take care! Feel free to come back anytime. 🙏',
  thanks: "You're welcome! 😊 Is there anything else I can help with?",
  'thank you': "You're welcome! Happy to help anytime! 🌟",
  good: 'Glad to hear that! 😄',
  'good morning': 'Good morning! ☀️ Hope you have a wonderful day!',
  'good night': 'Good night! 🌙 Sweet dreams!',
  help: `Here are the things I understand:\n\n💬 hello / hi / hey — Greetings\n🤔 how are you — Ask my status\n🧑 what is your name — My identity\n⚙️ what can you do — My capabilities\n🕐 time — Current server time\n📅 date — Today's date\n😂 joke — A programming joke\n🙏 thanks / thank you — Politeness\n👋 bye / exit — End conversation\n❓ help — Show this list`,
};

function getResponse(input) {
  const key = input.trim().toLowerCase();

  if (key === 'time') {
    return `🕐 The current server time is: **${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST**`;
  }
  if (key === 'date') {
    return `📅 Today's date is: **${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}**`;
  }

  // Exact match
  if (responses[key]) return responses[key];

  // Partial keyword match
  for (const keyword of Object.keys(responses)) {
    if (key.includes(keyword)) return responses[keyword];
  }

  return `🤔 Hmm, I don't quite understand "${input}". Try typing **help** to see what I can do!`;
}

// ─── WebSocket connection handler ─────────────────────────────────────────────
wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`[+] Browser client connected from ${ip}`);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'server',
    text: "Hello! 👋 I'm your Host-Server. Type **help** to see what I can do, or just say hi!",
    time: new Date().toLocaleTimeString(),
  }));

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw);
      const userMsg = data.text || '';

      if (!userMsg.trim()) return;

      console.log(`[MSG] User: ${userMsg}`);

      // Simulate slight typing delay for realism
      setTimeout(() => {
        const reply = getResponse(userMsg);
        ws.send(JSON.stringify({
          type: 'server',
          text: reply,
          time: new Date().toLocaleTimeString(),
        }));
        console.log(`[REPLY] Server: ${reply.split('\n')[0]}`);
      }, 600 + Math.random() * 400); // 600–1000ms delay

    } catch (e) {
      console.error('Parse error:', e.message);
    }
  });

  ws.on('close', () => {
    console.log(`[-] Browser client disconnected from ${ip}`);
  });

  ws.on('error', (err) => {
    console.error(`[!] WebSocket error: ${err.message}`);
  });
});

// ─── Start server ─────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║     HOST-SERVER WEB IS RUNNING 🌐        ║');
  console.log(`║   Open: http://localhost:${PORT}            ║`);
  console.log('╚══════════════════════════════════════════╝');
});
