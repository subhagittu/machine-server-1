# 🖥️ Host-Server Interaction System

A Node.js chat application with **three separate modes** — choose the one you want to run!

---

## 📁 Repository Structure

```
host-server-1/
│
├── terminal/               ← Option 1: Terminal-to-Terminal TCP chat
│   ├── server.js           ← TCP server (run first)
│   └── client.js           ← Terminal client (run second)
│
├── local-web/              ← Option 2: Browser UI on localhost:8070
│   ├── server.js           ← Express + WebSocket server (self-contained)
│   ├── package.json
│   └── public/
│       └── index.html      ← Green-themed chat UI
│
├── render-web/             ← Option 3: Cloud deployment (Render + Vercel)
│   ├── backend/            ← Deploy on Render
│   │   ├── server.js       ← WebSocket server with CORS + HTTP health check
│   │   └── package.json
│   └── frontend/           ← Deploy on Vercel
│       └── index.html      ← Purple-themed chat UI (connects to Render)
│
├── render.yaml             ← Render deployment config (rootDir: render-web/backend)
├── vercel.json             ← Vercel deployment config (serves render-web/frontend)
└── README.md
```

---

## 🖥️ Option 1 — Terminal Chat (No npm needed!)

Pure Node.js, no dependencies. Two terminal windows required.

### Terminal 1 — Start the server:
```bash
cd terminal
node server.js
```

### Terminal 2 — Start the client:
```bash
cd terminal
node client.js
```

Start typing in Terminal 2 and chat with the server!

---

## 🌐 Option 2 — Local Web UI (localhost:8070)

A beautiful browser chat UI running entirely on your machine.

```bash
cd local-web
npm install
node server.js
```

Open your browser → **http://localhost:8070**

- Green accent theme 🟢
- WebSocket connects to `ws://localhost:8070`
- Fully self-contained — no internet needed

---

## ☁️ Option 3 — Cloud Deployment (Render + Vercel)

Your chat app deployed on the internet!

| Part | Platform | Folder |
|------|----------|--------|
| Backend (WebSocket server) | **Render** | `render-web/backend/` |
| Frontend (Static HTML) | **Vercel** | `render-web/frontend/` |

### Render settings (Dashboard → Your Service → Settings):
| Setting | Value |
|---------|-------|
| Root Directory | `render-web/backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

### Vercel:
Auto-deploys from the repo. The `vercel.json` tells Vercel to serve `render-web/frontend/`.

> ⚠️ **If your Render URL is different**, update line in `render-web/frontend/index.html`:
> ```js
> const RENDER_WS_URL = 'wss://YOUR-SERVICE-NAME.onrender.com';
> ```

---

## 💬 Available Commands (all modes)

| Command | Response |
|---------|----------|
| `hello` / `hi` / `hey` | Greeting |
| `how are you` | Server status |
| `what is your name` | Server identity |
| `time` | Current IST time |
| `date` | Today's date |
| `joke` | A programmer joke |
| `thanks` / `thank you` | Politeness |
| `bye` / `exit` | End conversation |
| `help` | Full command list |

---

## ⚙️ Technical Notes

- **Option 1** uses Node's built-in `net` module — no npm install needed
- **Option 2** uses `express` + `ws` — WebSocket and HTTP served together
- **Option 3** backend uses `ws` only — pure WebSocket + HTTP health check for Render
- All modes simulate a typing delay (600–1000ms) before replying
