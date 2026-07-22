# 🖥️ Host-Server Chat System

A simple TCP-based terminal chat system built with Node.js. Two separate processes communicate over a local socket — the **server** waits for connections and replies with predefined messages, while the **host** is the terminal client you interact with.

---

## 📁 Folder Structure

```
host-server-1/
├── server/
│   └── server.js     ← TCP server with predefined responses
├── host/
│   └── host.js       ← Terminal client (you interact here)
└── README.md
```

---

## 🚀 How to Run

> **Requirements:** Node.js installed on your machine.

### Step 1 — Start the Server
Open **Terminal 1** and run:
```bash
cd server
node server.js
```
You should see:
```
╔══════════════════════════════════════════╗
║       HOST-SERVER IS RUNNING 🚀          ║
║   Listening on 127.0.0.1:3000           ║
║   Waiting for host connections...        ║
╚══════════════════════════════════════════╝
```

### Step 2 — Start the Host Client
Open **Terminal 2** and run:
```bash
cd host
node host.js
```

---

## 💬 Available Commands (type in Host terminal)

| Command            | Server Response                          |
|--------------------|------------------------------------------|
| `hello`            | Hello from server! 👋                   |
| `hi`               | Hi there! 😊                            |
| `hey`              | Hey! Welcome to the server.              |
| `how are you`      | I'm doing great... 🚀                   |
| `what is your name`| I'm the Host-Server! 🖥️                |
| `what can you do`  | Lists all commands                       |
| `time`             | Current server time                      |
| `date`             | Today's date                             |
| `joke`             | A programming joke 😂                   |
| `help`             | Shows the full command menu              |
| `bye` / `exit`     | Disconnects from server                  |

---

## ✅ Notes
- No external packages required — uses Node.js built-in `net` and `readline` modules.
- Always start the **server first**, then the **host**.
- Multiple host clients can connect to the same server simultaneously.
