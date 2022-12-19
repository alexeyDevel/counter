FROM node:18.12.1

ENV PORT=5000

WORKDIR /app

COPY /package*.json ./

RUN npm install

COPY *.js ./

CMD ["node", "index.js"]
