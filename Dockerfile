FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install @mui/x-charts

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html
COPY config.json /usr/share/nginx/html/config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
