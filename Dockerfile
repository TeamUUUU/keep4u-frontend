FROM node:8-alpine as build
WORKDIR /root
COPY package.json ./package.json
COPY /src ./src
COPY /public ./public
COPY yarn.lock ./yarn.lock
RUN yarn && yarn build
FROM nginx as  runtime
COPY --from=build /root/build /usr/share/nginx/build
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
