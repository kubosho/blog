FROM openresty/openresty:1.13.6.2-alpine

ENV PATH $PATH:/usr/sbin/

COPY ./tools/nginx/tmpl_nginx.conf /tools/nginx/tmpl_nginx.conf
COPY ./tools/nginx/generate_nginx_conf.go /tools/nginx/generate_nginx_conf.go
COPY ./tools/nginx/nginx_boot.sh /nginx_boot.sh

RUN chmod +x /nginx_boot.sh

RUN apk update \
  && apk add go

CMD ["/nginx_boot.sh"]
