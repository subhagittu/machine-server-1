const net = require('net');
const readline = require('readline');

const PORT = 3000;
const HOST = '127.0.0.1';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log('╔══════════════════════════════════════════╗');
console.log('║         HOST CLIENT STARTING... 🔌       ║');
console.log(`║   Connecting to server ${HOST}:${PORT}    ║`);
console.log('╚══════════════════════════════════════════╝\n');

const client = net.createConnection({ port: PORT, host: HOST }, () => {
  console.log('[✓] Connected to server!\n');
});

client.on('data', (data) => {
  process.stdout.write(data.toString());
  promptUser();
});

function promptUser() {
  rl.question('YOU: ', (input) => {
    const trimmed = input.trim();
    if (!trimmed) { promptUser(); return; }
    client.write(trimmed + '\n');
    if (trimmed.toLowerCase() === 'bye' || trimmed.toLowerCase() === 'exit') {
      setTimeout(() => { rl.close(); client.end(); process.exit(0); }, 1000);
    }
  });
}

client.on('end', () => { console.log('\n[!] Server closed the connection.'); rl.close(); process.exit(0); });
client.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.error('[✗] Could not connect. Is server.js running? (node server.js)');
  } else {
    console.error(`[!] Error: ${err.message}`);
  }
  rl.close(); process.exit(1);
});
