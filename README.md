# 🖥️ Host-Server Interaction System

A dual-mode Node.js chat application that demonstrates real-time network communication. This repository includes two distinct implementations:

1. **Terminal-to-Terminal TCP Sockets**
2. **Web-to-Browser HTTP & WebSockets**

Both modes process incoming messages and reply with predefined, dynamic responses from the server.

---

## 📁 Repository Structure

```
host-server-1/
├── host/
│   └── host.js       ← Terminal client (connects to the TCP server)
├── server/
│   └── server.js     ← TCP socket server (runs on port 3000)
├── web/
│   ├── public/
│   │   └── index.html← Dark-mode Glassmorphism chat page
│   ├── package.json  ← Web app dependencies (express, ws)
│   └── server.js     ← Express HTTP & WebSocket server (runs on port 8080)
└── README.md         ← This documentation file
```

---

## 🎮 Mode 1: Web Browser Interface (Recommended) 🌐

This mode launches an interactive chat website featuring a dark glassmorphism design, auto-scrolling, a simulated server typing animation, and quick-click suggestion chips.

### Setup Instructions:

1. **Open a terminal window** in the project directory.
2. Navigate to the `web` folder:
   ```bash
   cd web
   ```
3. Install the dependencies (only required once):
   ```bash
   npm install
   ```
4. Start the web server:
   ```bash
   node server.js
   ```
5. Open your browser and navigate to:
   **[http://localhost:8080](http://localhost:8080)**

---

## 💻 Mode 2: Terminal TCP Sockets 🖥️

This mode operates entirely in the terminal using Node.js's native `net` library to communicate over a TCP connection.

### Setup Instructions (requires two terminal windows):

#### Step 1: Start the TCP Server (Terminal 1)
1. Open your first terminal.
2. Navigate to the `server` directory and start the server code:
   ```bash
   cd server
   node server.js
   ```
   *The server will boot and begin listening on `127.0.0.1:3000` for client connections.*

#### Step 2: Start the Host Client (Terminal 2)
1. Open a second terminal window.
2. Navigate to the `host` directory and start the client code:
   ```bash
   cd host
   node host.js
   ```
3. Begin typing messages in Terminal 2!

---

## 💬 Predefined Commands & Responses

The server listens for specific keywords and replies accordingly. If your message contains one of the keywords, the corresponding response triggers.

| Command Keyword | Response Behavior |
| :--- | :--- |
| `hello` | Greets you back. |
| `hi` / `hey` | Casual greetings from the server. |
| `how are you` | Server reports its current status. |
| `what is your name` | Server identifies itself. |
| `what can you do` | Lists available commands. |
| `time` | Returns the **exact local time** dynamically. |
| `date` | Returns the **exact local date** dynamically. |
| `joke` | Tells a developer/programming joke. |
| `help` | Shows a formatted menu of commands. |
| `bye` / `exit` | Closes the connection and shuts down the client. |

---

## ⚙️ Technical Details

* **No Overhead:** The Terminal mode (`server/` and `host/`) runs on Node.js's built-in `net` and `readline` modules without any third-party npm package requirements.
* **Typing Simulation:** In the Web mode, the server uses a random delay between `600ms` and `1000ms` before responding to mimic a real typing user.
* **Auto-Reconnect:** The web UI will automatically attempt to reconnect to the WebSocket server if the connection drops.
