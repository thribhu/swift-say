# Stage 1: Build the Express.js application
FROM node:14 as build-milana-server
WORKDIR /usr/src/app/server
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
# Create a tarball of the Express application code
RUN tar -czvf milana-server.tar.gz .

# Stage 2: Build the Nginx image
FROM nginx:alpine
RUN mkdir -p /usr/src/app/server
COPY --from=build-milana-server /usr/src/app/server/milana-server.tar.gz /tmp/
RUN tar -xzvf /tmp/milana-server.tar.gz -C /usr/src/app/server

# Nginx should run on port 8080, same as the server app
EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
