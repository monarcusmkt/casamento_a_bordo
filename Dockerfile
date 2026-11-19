FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --package-lock-only --ignore-scripts && npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
ENV NODE_ENV=production PORT=80
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY server ./server
RUN mkdir -p /data/uploads && chown -R node:node /app /data/uploads
USER node
EXPOSE 80
CMD ["node","server/index.mjs"]
