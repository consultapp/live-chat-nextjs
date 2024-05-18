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

RUN npm run build

EXPOSE $PORT

# CMD ["npm", "run", "start"]
ENTRYPOINT ["npm", "start"]
