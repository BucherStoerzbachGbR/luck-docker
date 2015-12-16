FROM nginx:latest

MAINTAINER Philipp Bucher <bucher@navigate.de>

COPY . /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ADD ./default.conf /etc/nginx/conf.d/
RUN chown -R nginx:www-data /usr/share/nginx/html