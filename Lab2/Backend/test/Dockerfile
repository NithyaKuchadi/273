FROM node:8.7.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
EXPOSE 5000
RUN npm install
CMD ["npm", "run","start"]
