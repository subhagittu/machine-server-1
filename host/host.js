const net = require('net');
const readline = require('readline');

const PORT = 3000;
const HOST = '127.0.0.1';

// ─── Setup terminal readline interface ───────────────────────────────────────
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('╔══════════════════════════════════════════╗');
console.log('║         HOST CLIENT STARTING... 🔌       ║');
console.log(`║   Connecting to server ${HOST}:${PORT}    ║`);
console.log('╚══════════════════════════════════════════╝\n');

// ─── Connect to server ────────────────────────────────────────────────────────
const client = net.createConnection({ port: PORT, host: HOST }, () => {
  console.log('[✓] Connected to server!\n');
});

// ─── Receive data from server ─────────────────────────────────────────────────
client.on('data', (data) => {
  process.stdout.write(data.toString());

  // After receiving server's message, prompt user to type
  promptUser();
});

// ─── Ask user for input ───────────────────────────────────────────────────────
function promptUser() {
  rl.question('YOU: ', (input) => {
    const trimmed = input.trim();
    if (!trimmed) {
      promptUser();
      return;
    }

    client.write(trimmed + '\n');

    // Auto-close on bye/exit
    if (trimmed.toLowerCase() === 'bye' || trimmed.toLowerCase() === 'exit') {
      setTimeout(() => {
        rl.close();
        client.end();
        process.exit(0);
      }, 1000);
    }
  });
}

// ─── Handle connection end ────────────────────────────────────────────────────
client.on('end', () => {
  console.log('\n[!] Server closed the connection. Goodbye!');
  rl.close();
  process.exit(0);
});

// ─── Handle errors ────────────────────────────────────────────────────────────
client.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.error('[✗] Could not connect to server. Is the server running?');
    console.error(`    Make sure server is started on ${HOST}:${PORT}`);
  } else {
    console.error(`[!] Connection error: ${err.message}`);
  }
  rl.close();
  process.exit(1);
});
