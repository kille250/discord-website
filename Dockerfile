# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install any needed packages
RUN npm install --production

# Bundle your app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Run the server
CMD [ "node", "server.js" ]