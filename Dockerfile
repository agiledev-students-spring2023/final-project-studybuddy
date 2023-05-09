FROM node:14.15.4-alpine3.12 AS build

WORKDIR /app

COPY front-end/package.json ./

RUN npm install

ARG REACT_APP_BACK_URL
ENV REACT_APP_BACK_URL=${REACT_APP_BACK_URL}
ARG REACT_APP_WEBSOCKET_URL
ENV REACT_APP_WEBSOCKET_URL=${REACT_APP_WEBSOCKET_URL}

COPY front-end/ ./

RUN npm run build

FROM node:14.15.4-alpine3.12 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY back-end/package.json ./

RUN npm install --only=production

COPY back-end/ ./

COPY --from=build /app/build ./client/build

CMD ["node", "server.js"]