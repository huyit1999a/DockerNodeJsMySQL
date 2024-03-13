FROM node:18-alpine3.19

WORKDIR /huy/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "server.js"]