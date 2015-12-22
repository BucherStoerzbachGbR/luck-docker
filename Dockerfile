FROM nginx:latest

MAINTAINER Philipp Bucher <bucher@navigate.de>

COPY . /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ADD ./default.conf /etc/nginx/conf.d/

RUN usermod -u 1200 nginx && groupmod -g 1300 nginx

RUN chown -R nginx:nginx /usr/share/nginx/html