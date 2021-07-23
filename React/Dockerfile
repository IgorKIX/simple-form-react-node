FROM node:14.3-slim

WORKDIR /usr/src/react

COPY ./package.json ./

RUN npm i
RUN npm i -D

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

