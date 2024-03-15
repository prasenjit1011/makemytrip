# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN yarn

# Copy all files from the current directory to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3001
EXPOSE 2039

# Command to run the application
CMD ["node", "server.js"]