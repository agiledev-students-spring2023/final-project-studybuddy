FROM node:14.15.4-alpine3.12 AS build

WORKDIR /app

COPY front-end/package.json ./

RUN npm install

COPY front-end/ ./
RUN echo "REACT_APP_BACK_URL=/api" > .env

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