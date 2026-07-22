FROM node:22-alpine as builder

WORKDIR /backend/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8000

CMD ["npm", "start"]

