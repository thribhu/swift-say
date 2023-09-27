FROM node:20 as install-milana-dependencies
WORKDIR /usr/src/app/client
COPY package.json ./
RUN yarn install

FROM install-milana-dependencies as build-milana-client
COPY . .
RUN yarn build
RUN tar -czvf milana-client.tar.gz ./build


# Nginx should run on port 9000, same as the React app
FROM nginx:alpine as nginx-milana-client
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-milana-client /usr/src/app/client/milana-client.tar.gz /usr/share/nginx/html/
EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]
