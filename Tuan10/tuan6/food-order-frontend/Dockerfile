# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Truyền biến môi trường vào lúc build
ARG REACT_APP_USER_SERVICE_URL
ARG REACT_APP_FOOD_SERVICE_URL
ARG REACT_APP_ORDER_SERVICE_URL
ARG REACT_APP_PAYMENT_SERVICE_URL
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
