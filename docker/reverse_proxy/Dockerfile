FROM openresty/openresty:1.13.6.2-stretch

WORKDIR /blog

ENV NGINX_USER nginx

RUN useradd -m ${NGINX_USER}
RUN gpasswd -a ${NGINX_USER} sudo

RUN mkdir -p /var/cache/nginx/
RUN mkdir -p /var/log/nginx/

EXPOSE 80 443
CMD ["nginx", "-c", "/blog/nginx/nginx.conf"]
