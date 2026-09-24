# MERCHROOM — Latest System Diagrams

These four SVG diagrams are generated from the current source code, not from the older mock-only design documents.

- `01-api-method-routes-latest.svg` — every active Express endpoint from `server/app.js` and `server/routes/*.routes.js`, including the Nong Hed chat endpoint.
- `02-er-diagram-database-latest.svg` — all current Mongoose collections, embedded Cart/Order items, ObjectId references, encryption at rest, and the `seed.js` baseline.
- `03-use-case-diagram-latest.svg` — Visitor, Customer, Admin, Payment Provider, and Gemini/Nong Hed responsibilities.
- `04-sequence-diagram-latest.svg` — public catalogue, checkout/payment, and agentic chatbot request flows.

To regenerate after a schema or route change, run:

```powershell
node Docs/diagrams/generate-latest-system-diagrams.js
```

Source of truth checked on 24 September 2026: `server/seed.js`, `server/models/`, `server/routes/`, `server/controllers/`, and `server/app.js`.
