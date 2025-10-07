FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV CHOKIDAR_USEPOLLING=1

EXPOSE 3000 

CMD ["npx","nodemon","app.js"]