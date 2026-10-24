# SRINUMA Website — Complete React Project

This is the React website version from the preview, with full logos, animations and four fictional CRM demos: IMR Groups, MK ZORA, STOCKORA and GARUDAN NEXUS.

## Windows setup
Install Node.js 20.19+ or 22.12+ (your Node 24 is supported).
Extract the ZIP so package.json is at D:\srinuma-website\package.json.
Open Command Prompt and run:

```bat
cd /d D:\srinuma-website
npm ci
npm run dev
```
Open the Local URL printed in the terminal, normally http://localhost:5173.
Stop the server with Ctrl+C. Do not double-click index.html to run this React app.

## Production
```bat
npm run build
npm run preview
```
Build output is in dist/. The included dist/ is already built; npm run build regenerates it after edits.

## Vercel
Import this project or upload its source through your own Vercel workflow.
Framework: Vite. Build: npm run build. Output: dist. No environment variables required.
vercel.json is included. Vercel account permissions still apply; this ZIP does not bypass them.
public/_headers is for hosts that support that format. Vercel uses vercel.json instead.

## Main files
- src/main.jsx: React page and interactive demo components
- src/styles.css: responsive styling and animations
- src/data.js: fictional project/demo records
- public/: transparent logo assets
- index.html: Vite entry point
- vite.config.js: production bundling; source maps disabled
- package-lock.json: reproducible dependency installation
- dist/: ready-built production files

## Behaviour and limitations
- WhatsApp enquiries open a prefilled message; the visitor must send it.
- No backend, database, authentication or live client CRM access is included.
- Demo edits reset after closing the demo or reloading the page.
- Google Fonts needs internet access; fallback fonts work offline.
- Production JavaScript is minified. Browser-delivered frontend code remains inspectable.
- Real passwords/API secrets must never be added to frontend source.
- Build and React render checks passed. Browser visual QA was not performed.

node_modules and hosting credentials are intentionally excluded. npm ci installs dependencies.
