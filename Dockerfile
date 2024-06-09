FROM node:21-alpine3.18
EXPOSE 3000
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "/app/index.js"]