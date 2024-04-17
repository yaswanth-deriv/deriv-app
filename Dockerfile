FROM nginx:1.25.4-alpine3.18
COPY ./packages/core/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html

