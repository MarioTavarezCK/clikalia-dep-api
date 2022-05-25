FROM node:14
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY . .

RUN npm install

EXPOSE 3001:3001

CMD ["npm", "run", "dev"]