const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// ─── Allowed origins (add your Vercel URL here) ───────────────────────────────
const ALLOWED_ORIGINS = [
  'https://machine-server-1.vercel.app',
  'http://localhost:8070',
  'http://localhost:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501',
];

// ─── Predefined Responses ─────────────────────────────────────────────────────
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

  if (responses[key]) return responses[key];

  for (const keyword of Object.keys(responses)) {
    if (key.includes(keyword)) return responses[keyword];
  }

  return `🤔 Hmm, I don't quite understand "${input}". Try typing **help** to see what I can do!`;
}

// ─── HTTP server (for health checks) ─────────────────────────────────────────
const httpServer = http.createServer((req, res) => {
  // Handle CORS preflight
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

// ─── WebSocket server ─────────────────────────────────────────────────────────
const wss = new WebSocket.Server({
  server: httpServer,
  verifyClient: ({ origin }, cb) => {
    // Allow connections with no origin (e.g., local tools) or from allowed origins
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      cb(true);
    } else {
      console.warn(`[!] Rejected connection from origin: ${origin}`);
      cb(false, 403, 'Forbidden');
    }
  },
});

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`[+] New client connected from ${ip}`);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'server',
    text: "Hello! 👋 I'm your Host-Server. Type **help** to see what I can do, or just say hi!",
    time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }));

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      const userMsg = data.text || '';

      if (!userMsg.trim()) return;

      console.log(`[MSG] User: ${userMsg}`);

      // Simulate typing delay
      setTimeout(() => {
        const reply = getResponse(userMsg);
        ws.send(JSON.stringify({
          type: 'server',
          text: reply,
          time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }));
        console.log(`[REPLY] Server: ${reply.split('\n')[0]}`);
      }, 600 + Math.random() * 400);

    } catch (e) {
      console.error('Parse error:', e.message);
    }
  });

  ws.on('close', () => {
    console.log(`[-] Client disconnected from ${ip}`);
  });

  ws.on('error', (err) => {
    console.error(`[!] WebSocket error: ${err.message}`);
  });
});

// ─── Start server ─────────────────────────────────────────────────────────────
httpServer.listen(PORT, HOST, () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║     HOST-SERVER IS RUNNING 🚀            ║');
  console.log(`║   WebSocket on ${HOST}:${PORT}            ║`);
  console.log('║   Waiting for connections...             ║');
  console.log('╚══════════════════════════════════════════╝');
});
