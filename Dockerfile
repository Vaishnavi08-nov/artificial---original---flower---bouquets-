FROM node:20-alpine
WORKDIR /app
COPY backend/package.json ./backend/package.json
COPY backend/server.js ./backend/server.js
COPY src/data/products.js ./src/data/products.js
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "backend/server.js"]
