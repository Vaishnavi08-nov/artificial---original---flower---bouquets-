import { createServer } from 'node:http';
import { products } from '../src/data/products.js';

const port = Number(process.env.PORT) || 4000;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',').map((origin) => origin.trim()).filter(Boolean);

function send(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (request.method === 'OPTIONS') { response.writeHead(204); return response.end(); }
  if (request.method === 'GET' && request.url === '/api/health') return send(response, 200, { status: 'ok', service: 'Bloomify demo API' });
  if (request.method === 'GET' && request.url === '/api/products') return send(response, 200, { products, demo: true });
  if (request.method === 'POST' && request.url === '/api/orders') {
    try {
      let rawBody = '';
      for await (const chunk of request) {
        rawBody += chunk;
        if (rawBody.length > 20_000) return send(response, 413, { error: 'Request is too large.' });
      }
      const { customer, items } = JSON.parse(rawBody || '{}');
      const phone = String(customer?.phone ?? '').replace(/\D/g, '');
      if (typeof customer?.name !== 'string' || customer.name.trim().length < 2 || phone.length < 10 ||
          typeof customer?.address !== 'string' || customer.address.trim().length < 10 ||
          !Array.isArray(items) || items.length === 0) return send(response, 400, { error: 'Please provide valid delivery details and at least one item.' });
      const orderItems = items.map(({ id, quantity }) => {
        const product = products.find((entry) => entry.id === id);
        const count = Number(quantity);
        return product && Number.isInteger(count) && count > 0 && count <= 99 ? { product, quantity: count } : null;
      });
      if (orderItems.some((item) => item === null)) return send(response, 400, { error: 'One or more products or quantities are invalid.' });
      const total = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return send(response, 201, { orderId: `DEMO-${Date.now()}`, status: 'demo-only', total, message: 'Demo request validated. No order was saved, payment collected, or shop notified.' });
    } catch {
      return send(response, 400, { error: 'Please provide a valid JSON request.' });
    }
  }
  return send(response, 404, { error: 'API route not found.' });
});

server.listen(port, '0.0.0.0', () => console.log(`Bloomify demo API listening on port ${port}`));
