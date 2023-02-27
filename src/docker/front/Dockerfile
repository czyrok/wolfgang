# Stage 1
FROM node:18.14.2 as node
WORKDIR /app

# Copying files into app
COPY . .

# Installing dependences
# RUN npm install

# Executing common build script
# /!\ script de build pas fixé
# RUN npm run build -w common

# Executing front build script
RUN npm run build --prod -w front

# Stage 2
FROM nginx:alpine

# Copying app files into nginx
COPY --from=node /app/packages/front/dist/front /usr/share/nginx/html

# Copying configuration file into nginx
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Exposing 80 port
EXPOSE 80