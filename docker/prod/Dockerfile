FROM node:alpine as build

# Set working directory of app in image
WORKDIR /app

# Copy all files over
COPY . .

# Install the server's build dependencies
RUN npm install

# Change to the client directory
WORKDIR /app/client

# Install the client's build dependencies
RUN npm install

# Build the client
RUN npm run build

# Move back to server
WORKDIR /app
 
# Run the server build
RUN npm run build


# New layer, so that the dev dependency modules and source code
# do not get added to the image
FROM node:alpine

# Change working dir to /app in the new layer
WORKDIR /app

# Bring package files in for server
COPY package*.json ./

RUN npm ci --only=production

# Copy over the built server
COPY --from=build /app/build ./build

# Copy over the built client
COPY --from=build /app/client/build /app/client/build

# Expose the port
EXPOSE 4000

# Command to be run in production
ENTRYPOINT ["npm", "run", "start:prod"]
