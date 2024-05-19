# FROM  --platform=linux/amd64  node:20-bullseye
FROM  node:20-bullseye
RUN npm set strict-ssl false

WORKDIR /src

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV PORT=3000
ENV NODE_ENV=production
ENV PRODUCTION_DOMAIN=live-chat.consultapp.ru
ENV STRAPI_SERVER=http://92.53.105.129:3030
ENV MANAGER_EMAIL=manager@consultapp.ru
ENV MANAGER_PASSWORD=228.2qK.vXbrCXB

RUN npm run build

EXPOSE $PORT

# CMD ["npm", "run", "start"]
ENTRYPOINT ["npm", "start"]
