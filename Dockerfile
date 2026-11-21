FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
# Reconcile the legacy lockfile before installing dependencies.
# The React Quill beta requires legacy peer resolution.
RUN npm install --package-lock-only --ignore-scripts --legacy-peer-deps \
    && npm ci --legacy-peer-deps
COPY . .
RUN npm run build
# Prune dependencies from the reconciled installation; avoid a second npm ci against the stale lockfile.
RUN npm prune --omit=dev --legacy-peer-deps && npm cache clean --force

FROM node:24-alpine
ENV NODE_ENV=production PORT=80
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY server ./server
RUN mkdir -p /data/uploads && chown -R node:node /app /data/uploads
USER node
EXPOSE 80
CMD ["node","server/index.mjs"]
