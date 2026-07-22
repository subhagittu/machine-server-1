const net = require('net');

const PORT = 3000;
const HOST = '127.0.0.1';

// ─── Predefined manual responses ────────────────────────────────────────────
const responses = {
  hello: 'Hello from server! 👋 Great to hear from you!',
  hi: 'Hi there! 😊 How can I help you today?',
  hey: "Hey! Welcome to the server. What's up?",
  'how are you': "I'm doing great, thanks for asking! The server is running smoothly. 🚀",
  'what is your name': "I'm the Host-Server, your friendly TCP server! 🖥️",
  'what can you do': 'I can respond to your messages! Try: hello, hi, hey, how are you, time, help, bye.',
  help: `
╔══════════════════════════════════════╗
║         AVAILABLE COMMANDS           ║
╠══════════════════════════════════════╣
║  hello            → Greeting         ║
║  hi               → Casual hello     ║
║  hey              → Another greeting ║
║  how are you      → Server status    ║
║  what is your name → Server identity ║
║  what can you do  → List commands    ║
║  time             → Get server time  ║
║  date             → Get server date  ║
║  joke             → Hear a joke      ║
║  bye / exit       → Disconnect       ║
║  help             → Show this menu   ║
╚══════════════════════════════════════╝`,
  joke: 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂',
  bye: 'Goodbye! It was nice chatting with you. See you next time! 👋',
  exit: 'Disconnecting... Take care! 🙏',
};

// ─── Get server response for a given input ───────────────────────────────────
function getResponse(input) {
  const key = input.trim().toLowerCase();

  if (key === 'time') {
    return `The current server time is: ${new Date().toLocaleTimeString()}`;
  }
  if (key === 'date') {
    return `Today's date is: ${new Date().toLocaleDateString()}`;
  }
  if (responses[key]) {
    return responses[key];
  }

  // Partial keyword match
  for (const keyword of Object.keys(responses)) {
    if (key.includes(keyword)) {
      return responses[keyword];
    }
  }

  return `🤔 Hmm, I don't understand "${input}". Type "help" to see what I can do!`;
}

// ─── Create TCP Server ────────────────────────────────────────────────────────
const server = net.createServer((socket) => {
  const clientAddr = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`\n[+] New client connected: ${clientAddr}`);

  socket.write(
    '\n╔══════════════════════════════════════════╗\n' +
    '║   Welcome to the Host-Server! 🖥️          ║\n' +
    '║   Type "help" to see available commands.  ║\n' +
    '║   Type "bye" or "exit" to disconnect.     ║\n' +
    '╚══════════════════════════════════════════╝\n\n' +
    "SERVER: Hello! I'm ready to chat. What would you like to say? 😊\n"
  );

  socket.on('data', (data) => {
    const message = data.toString().trim();
    if (!message) return;

    console.log(`[${clientAddr}] HOST says: ${message}`);

    const reply = getResponse(message);
    socket.write(`SERVER: ${reply}\n`);
    console.log(`[${clientAddr}] SERVER replied: ${reply.split('\n')[0]}`);

    if (message.toLowerCase() === 'bye' || message.toLowerCase() === 'exit') {
      setTimeout(() => socket.end(), 500);
    }
  });

  socket.on('end', () => {
    console.log(`[-] Client disconnected: ${clientAddr}`);
  });

  socket.on('error', (err) => {
    console.error(`[!] Socket error from ${clientAddr}: ${err.message}`);
  });
});

server.on('error', (err) => {
  console.error(`[!] Server error: ${err.message}`);
});

server.listen(PORT, HOST, () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║       HOST-SERVER IS RUNNING 🚀          ║');
  console.log(`║   Listening on ${HOST}:${PORT}           ║`);
  console.log('║   Waiting for host connections...        ║');
  console.log('╚══════════════════════════════════════════╝');
});
