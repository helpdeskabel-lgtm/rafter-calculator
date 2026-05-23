# Rafter Length Calculator

A simple web app that calculates roof rafter length using the Pythagorean theorem.

You enter:
- Total building width (feet and inches)
- Rafter height / rise (feet and inches)

The app divides the width by 2 to get the run, then computes:

```
rafter = √(run² + height²)
```

Results are shown in feet and inches.

Assumptions: ignores stud thickness, overhang, and roof pitch complexity — pure right triangle.

---

## Run locally

You need Node.js 18 or newer.

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

---

## Deploy to Render

1. Push this folder to a GitHub repository.
2. In the [Render Dashboard](https://dashboard.render.com), click **New → Web Service**.
3. Connect your GitHub account and pick the repo.
4. Fill in the settings:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free is fine for testing.
5. Click **Create Web Service**. Render will install, build, and start the app.
6. When it's live, Render gives you a URL like `https://rafter-calculator.onrender.com`.

The server reads `process.env.PORT`, which Render sets automatically, so no extra configuration is needed.

---

## Project structure

```
rafter-calculator/
├── package.json       # dependencies and start script
├── server.js          # Express server, serves the public/ folder
├── public/
│   ├── index.html     # form and result layout
│   ├── style.css      # styling
│   └── app.js         # calculation logic (runs in the browser)
└── README.md
```
