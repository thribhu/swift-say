FROM node:20 as install-dependencies
WORKDIR /usr/src/app/client
COPY package.json ./
RUN yarn install

FROM install-dependencies as build-client
COPY . .
RUN yarn build

FROM nginx:alpine as milana-client-nginx
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-client /usr/src/app/client/build /usr/share/nginx/html/

# Nginx should run on port 9000, same as the React app
EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]
