FROM node:18 as builder

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .

# Build for production
RUN yarn run build

# Serve the build with Nginx
FROM nginx:alpine

# Copy React build to Nginx public directory
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
