# Stage 1: Build the `milana` server application
FROM node:20 as build-milana-server
WORKDIR /usr/src/app/server
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .

# Create a tarball of the milana server application code (excluding node_modules)
RUN mkdir -p /tmp/milana-tmp && \
    cp -r * /tmp/milana-tmp/ && \
    rm -rf /tmp/milana-tmp/node_modules && \
    tar -czvf milana-server.tar.gz -C /tmp/milana-tmp . && \
    rm -rf /tmp/milana-tmp

# Stage 2: Build the Nginx image
FROM nginx:alpine as milana-nginx
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /usr/src/app/server
COPY --from=build-milana-server /usr/src/app/server/milana-server.tar.gz /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/
RUN tar -xzvf milana-server.tar.gz && rm milana-server.tar.gz

# Nginx should run on port 8080, same as the server app
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
