# Bloomify Flower Store

A responsive React + Vite flower shop demo with 32 sample products, four categories, product details, search and sorting, saved wishlist and cart, plus a small Node.js demo API.

## Run locally

1. Install Node.js 20 or newer.
2. In the project root, run `npm install` and `npm run dev`.
3. In a second terminal, run `cd backend`, `npm install`, then `npm start`.
4. Open the Vite address (normally `http://localhost:5173`). The API health endpoint is `http://localhost:4000/api/health`.

The frontend works without the API using its local demo checkout. To use the API, create a root `.env.local` containing `VITE_API_URL=http://localhost:4000`, then restart Vite.

## Demo API

- `GET /api/health` reports service health.
- `GET /api/products` returns the sample catalogue.
- `POST /api/orders` validates a demo checkout request and returns a demo confirmation. It does not save order/customer details, collect payment, or notify a shop.

The API uses only Node's built-in HTTP server. `FRONTEND_ORIGIN` is a comma-separated allowlist used for browser CORS. Copy `backend/.env.example` when configuring a local API.

## Deploy frontend to Vercel and API to Render

1. Push this repository to GitHub.
2. In Render, create a **Blueprint** from this repository. Render reads `render.yaml`; it creates a Node web service with `backend` as its root directory. After deployment, copy its public service URL and check `<render-url>/api/health`.
3. In Vercel, import the same repository as a Vite project. Use build command `npm run build` and output directory `dist` (the defaults should be detected). Add environment variable `VITE_API_URL` with the Render service URL (no trailing slash), then redeploy.
4. In Render, set `FRONTEND_ORIGIN` to the Vercel production URL (for example `https://your-project.vercel.app`) and redeploy the API so browser requests are allowed from the deployed site.

The `vercel.json` rewrite supports React Router deep links. `localhost` is private to your computer, not a public website address.

## Demo limitations

Product names, photos, prices, availability, reviews, and order confirmations are sample content. Checkout and API endpoints are demos: no order is persisted, paid, or sent to a real shop. Login/signup are frontend-only and do not provide authentication. Production use needs secure authentication, persistent storage, payment and fulfillment integrations, real business policies, and careful handling of customer data. Replace placeholder contact/policy details before launch.
