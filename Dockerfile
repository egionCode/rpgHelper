FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.docker .env
RUN npm run build
EXPOSE 3000
CMD node --env-file=.env build