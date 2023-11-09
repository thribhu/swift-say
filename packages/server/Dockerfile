# Stage 1: Build the Express.js application
FROM node:20 as build-milana-server
WORKDIR /usr/src/app/server
COPY package.json ./
RUN yarn install 
COPY . .
RUN tar -czvf milana-server.tar.gz ./*


# Stage 2: Create a minimal Node.js runtime image
FROM build-milana-server as runtime-milana-server
WORKDIR /usr/src/app/server
COPY --from=build-milana-server /usr/src/app/server/milana-server.tar.gz /usr/src/app/server/milana-server.tar.gz
RUN tar -xzvf milana-server.tar.gz
EXPOSE 8080
ENTRYPOINT ["node", "./bin/www"]

