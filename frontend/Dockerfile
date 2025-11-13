FROM node:20-bullseye AS build
WORKDIR /app

COPY package*.json ./

RUN npm set fetch-retries 5 \
    && npm set fetch-retry-factor 2 \
    && npm set fetch-retry-mintimeout 1000 \
    && npm set fetch-retry-maxtimeout 60000 \
    && npm cache clean --force \
    && npm ci --no-audit --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
