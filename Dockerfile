# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./index.html

# Verify the installation and environment
RUN node -v
RUN npm -v
RUN npm list

# Add debugging step to check the contents of the working directory
RUN ls -la /app

# Add debugging step to check the contents of the src directory
RUN ls -la /app/src

# Add debugging step to check the contents of the public directory
RUN ls -la /app/public

# Add debugging step to check the contents of the root directory
RUN ls -la /app

# Build the app using vite directly
RUN npx vite build

# Install serve to serve the build files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 8080

# Start the backend server and the frontend using serve
CMD ["sh", "-c", "node src/server.js & serve -s dist"]