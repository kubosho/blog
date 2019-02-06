#!/bin/sh

# build
/usr/bin/go run /usr/local/openresty/nginx/conf/tmpl_nginx.conf

# start nginx
/usr/local/openresty/nginx/sbin/nginx
