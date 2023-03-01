FROM node:16.18.1

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3120

CMD ["node","server.js"]