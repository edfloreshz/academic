FROM node:13.12.0-alpine AS base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN npm install react-scripts@3.4.1 -g --silent
RUN yarn build 

# production environment
FROM nginx:stable-alpine
COPY --from=base /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
