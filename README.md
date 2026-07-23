# 🖥️ Host-Server Interaction System

Three clean modes — pick one and run it.

---

## 📁 Structure

```
host-server-1/
├── terminal/         ← Option 1: Terminal chat (no npm needed)
│   ├── server.js
│   └── client.js
│
├── localhost/        ← Option 2: Browser UI on localhost:8070
│   ├── server.js
│   ├── package.json
│   └── public/
│       └── index.html
│
└── web/              ← Option 3: Cloud (Render backend + Vercel frontend)
    ├── server.js     ← WebSocket server → deploy on Render
    ├── package.json
    └── index.html    ← Static frontend → deploy on Vercel
```

---

## Option 1 — Terminal Chat

No install needed. Open **two terminals**:

```bash
# Terminal 1 — start server
cd terminal
node server.js

# Terminal 2 — start client
cd terminal
node client.js
```

---

## Option 2 — Local Browser UI

```bash
cd localhost
npm install
node server.js
```
Open → **http://localhost:8070**

---

## Option 3 — Cloud (Render + Vercel)

**Render settings** (Dashboard → Service → Settings):

| Setting | Value |
|---------|-------|
| Root Directory | `web` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

Vercel auto-deploys `web/index.html` as the frontend.

> ⚠️ If your Render URL differs, update this line in `web/index.html`:
> ```js
> const RENDER_WS_URL = 'wss://YOUR-SERVICE.onrender.com';
> ```

---

## Commands (all modes)

| Command | Response |
|---------|----------|
| `hello` / `hi` / `hey` | Greeting |
| `how are you` | Server status |
| `time` | Current IST time |
| `date` | Today's date |
| `joke` | Programmer joke |
| `bye` / `exit` | End chat |
| `help` | Full list |
