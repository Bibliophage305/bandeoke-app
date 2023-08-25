FROM node:18-alpine

COPY .output /
COPY static /static

EXPOSE 3000

WORKDIR /

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", "/server/index.mjs"]