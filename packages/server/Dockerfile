# Stage 1: Install Dependencies
FROM node:20 as dependencies
ENV NODE_OPTIONS="--enable-source-maps"

WORKDIR /usr/src/app/server
COPY package.json ./
RUN yarn install

# Stage 2: Build the Express.js application
FROM node:20 as build-milana-server
WORKDIR /usr/src/app/server
COPY --from=dependencies /usr/src/app/server/node_modules ./node_modules
COPY . .
RUN tar -czvf milana-server.tar.gz ./*

# Stage 3: Create a minimal Node.js runtime image
FROM build-milana-server as runtime-milana-server
WORKDIR /usr/src/app/server
COPY --from=build-milana-server /usr/src/app/server/milana-server.tar.gz /usr/src/app/server/milana-server.tar.gz
RUN tar -xzvf milana-server.tar.gz
EXPOSE 8080
ENTRYPOINT ["node", "./bin/www"]
