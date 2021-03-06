# build environment
FROM node:12.14-alpine as build

# set node environment to production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN mkdir /opt/basic-auth-client && chown node:node /opt/basic-auth-client
WORKDIR /opt/basic-auth-client

USER node
COPY package*.json ./

RUN npm install --silent --only=production
COPY . .
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /opt/basic-auth-client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
