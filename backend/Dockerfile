FROM node:18

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn global add typescript

RUN yarn run build

CMD ["node", "dist/index.js"]
