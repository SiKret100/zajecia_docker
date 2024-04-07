FROM scratch AS builder
ADD alpine-minirootfs-3.19.1-aarch64.tar /
ARG VERSION
WORKDIR /usr/app

RUN apk update && apk add nodejs npm

COPY ./package.json ./
RUN npm install
COPY ./index.js ./

EXPOSE 4000

FROM nginx:alpine

ARG VERSION
ENV APP_VERSION=${VERSION:-1.0.0}

RUN apk update && apk add nodejs
COPY --from=builder /usr/app /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=5 \
    CMD curl -f http://localhost:80 || exit 1

CMD nginx -g "daemon off;" & node index.js  