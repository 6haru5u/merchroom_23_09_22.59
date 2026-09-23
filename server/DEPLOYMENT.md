# Environment variables

## Local development

Copy `.env.example` to `.env`, then replace the placeholder values. `db.js` reads `MONGO_URI` through `process.env.MONGO_URI`.

## Vercel

Vercel does not read or expose your local `.env` file. In the Vercel project, open **Settings → Environment Variables** and add these values for the required environments:

- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — long random secret used to sign login tokens

Do not commit or display the real MongoDB connection string in source code, logs, or the browser.
