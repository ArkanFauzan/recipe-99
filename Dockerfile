FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve for production mode
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3001

# Command to start the application in production mode
CMD ["serve", "-s", "build", "-l", "3001"]
