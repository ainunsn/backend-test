FROM node:12


COPY package*.json ./

RUN yarn install
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
