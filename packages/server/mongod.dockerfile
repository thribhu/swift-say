FROM mongo:latest

LABEL org.opencontainers.image.title="learn-to-code mongo db image" \
      org.opencontainers.image.description="Various blogs, videos, registration, comments and so on are stored in the database" \
      org.opencontainers.image.vendor="MongoDB, Inc." \
      org.opencontainers.image.documentation="https://docs.mongodb.com/manual/" \
      org.opencontainers.image.source="https://github.com/mongodb/mongo" \
      org.opencontainers.image.version="4.4.12" \
      org.opencontainers.image.url="https://www.mongodb.com" \
      org.opencontainers.image.authors="MongoDB, Inc." \
      org.opencontainers.image.licenses="SSPL-1.0"

VOLUME ["/data/db"]

EXPOSE 27017
EXPOSE 27018
EXPOSE 27019

CMD ["mongod"]

USER mongodb
