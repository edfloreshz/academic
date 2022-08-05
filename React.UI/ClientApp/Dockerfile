FROM node:16.16.0-alpine
EXPOSE 3000
WORKDIR /app
COPY React.UI/ClientApp/package.json ./
COPY React.UI/ClientApp/yarn.lock ./
COPY ./React.UI/ClientApp ./
RUN yarn install --silent
CMD ["yarn", "run", "start"]
