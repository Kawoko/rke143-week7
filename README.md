# RKE143 Express App

This project implements a simple Node.js + Express server exposing POST /rke143.

How it works
- POST /rke143 expects JSON body: { "nimi": "rke", "kood": "143" }
- If credentials match, server responds with contents of `nodejs.json` (JSON).
- Otherwise responds `invalid credentials` with 400 status.

Local run

1. Install dependencies:

```bash
npm install
```

2. Start:

```bash
npm start
```

Deploy to Render.com

1. Push this repo to GitHub.
2. In Render, create a new Web Service -> Connect to GitHub repo.
3. Build Command: `npm install`  Start Command: `npm start`.
4. Render will set `PORT` automatically; the server uses `process.env.PORT`.

Test endpoint (replace <your-url>):

```bash
curl -X POST https://<your-url>/rke143 -H "Content-Type: application/json" -d '{"nimi":"rke","kood":"143"}'
```
