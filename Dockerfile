# Use Node official image
FROM node:18
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build NestJSs
RUN npm run build

# Expose port (match your app.listen() port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]