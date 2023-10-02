FROM node:20 as install-milana-dependencies
WORKDIR /usr/src/app/client
COPY package.json ./
RUN yarn install

FROM install-milana-dependencies as build-milana-client
COPY . .
RUN yarn build
RUN tar -czvf milana-client.tar.gz -C ./build .

# Nginx should run on port 9000, same as the React app
FROM nginx:latest as nginx-milana-client
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-milana-client /usr/src/app/client/milana-client.tar.gz /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/
RUN tar -xzvf milana-client.tar.gz
EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]