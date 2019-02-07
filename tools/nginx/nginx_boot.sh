#!/bin/sh

# build
/usr/bin/go run /tools/nginx/generate_nginx_conf.go

# start nginx
/usr/local/openresty/nginx/sbin/nginx
