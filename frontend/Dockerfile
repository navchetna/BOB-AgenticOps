FROM node:20-alpine

WORKDIR /app

# Picked up automatically by BuildKit from the host's proxy env vars, if set.
ARG http_proxy
ARG https_proxy
ARG no_proxy

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
