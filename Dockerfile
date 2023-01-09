FROM node:16-alpine

WORKDIR /shop

COPY ./package.json ./package-lock.json /shop/

RUN npm install

COPY . /shop/

EXPOSE 3000
CMD ["npm", "run", "start:dev"]