# Stage 1: Install Dependencies
FROM node:20 as dependencies
ENV NODE_OPTIONS="--enable-source-maps"

WORKDIR /usr/src/app/server
COPY package.json ./
ENV NODE_ENV=production
RUN npm install --omit=dev

# Stage 2: Build the Express.js application
FROM node:20 as build-message-class
WORKDIR /usr/src/app/server
COPY --from=dependencies /usr/src/app/server/node_modules ./node_modules
COPY . .
RUN tar -czvf message-class.tar.gz ./*

# Stage 3: Create a minimal Node.js runtime image
FROM build-milana-server as runtime-milana-server
WORKDIR /usr/src/app/server
COPY --from=build-message-class /usr/src/app/server/message-class.tar.gz /usr/src/app/server/message-class.tar.gz
RUN tar -xzvf message-class.tar.gz
EXPOSE 8080
ENTRYPOINT ["node", "./bin/www"]
