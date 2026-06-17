# Frontend Dockerfile
FROM node:20 as build-stage

WORKDIR /app

COPY geopulse/package*.json ./
RUN npm install

COPY geopulse/ .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/geopulse /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
