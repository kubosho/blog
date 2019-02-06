FROM openresty/openresty:1.13.6.2-alpine

ENV PATH $PATH:/usr/sbin/

COPY tmpl_nginx.conf /usr/local/openresty/nginx/conf/tmpl_nginx.conf

COPY tools/nginx/nginx_boot.sh /nginx_boot.sh
RUN chmod +x /nginx_boot.sh

RUN apk update \
  && apk add go

CMD ["/nginx_boot.sh"]
