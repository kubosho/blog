FROM node:12.1.0-stretch as nodejs

COPY . /blog
WORKDIR /blog

RUN make -C . init -j

EXPOSE 8080 9229
ENTRYPOINT ["make", "serve"]
