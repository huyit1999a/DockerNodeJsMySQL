FROM node:18-alpine3.19

WORKDIR /huy/app

COPY package*.json ./

RUN apk update && apk add bash

RUN npm install

COPY . .
EXPOSE 3000

# CMD ["node", "server.js"]

# Run tests using Jest
CMD ["npm", "test"]