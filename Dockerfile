FROM node:gallium as builder

WORKDIR /home/node/app
COPY --chown=node:node ./package*.json ./
RUN npm ci && npm cache clean --force

COPY --chown=node:node . .
RUN npm run build

FROM node:gallium-bullseye-slim as runtime

WORKDIR /home/node/app
ENV NODE_ENV=production
USER node

COPY --from=builder --chown=node:node /home/node/app/package*.json ./
RUN npm ci && npm cache clean --force

COPY --from=builder --chown=node:node /home/node/app/dist/ ./dist/

CMD ["node", "./dist/main.js"]