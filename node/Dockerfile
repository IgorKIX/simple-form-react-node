FROM node:14.17-alpine

WORKDIR /usr/src/node

COPY ./package.json ./

RUN npm i
RUN npm i -D

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
