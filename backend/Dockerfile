# Use an official Node.js runtime as a parent image
# Using LTS (Long Term Support) version is generally recommended for stability
FROM node:lts-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If using yarn, uncomment the line below and comment out the npm ci line
# COPY yarn.lock ./

# Install app dependencies using npm ci for faster, more reliable builds
# If using yarn, use 'RUN yarn install --frozen-lockfile'
RUN npm ci

# Copy the rest of the application code into the container
COPY . .

# Compile TypeScript to JavaScript
# Assuming your tsconfig.json outputs to a 'dist' folder
RUN npm run build

# --- Production Stage ---
FROM node:lts-alpine

WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
# If using yarn, uncomment the line below and comment out the npm ci line
# COPY --from=builder /usr/src/app/yarn.lock ./

# Install *only* production dependencies
# If using yarn, use 'RUN yarn install --production --frozen-lockfile'
RUN npm ci --omit=dev

# Copy the compiled JavaScript code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on (adjust if your app uses a different port)
EXPOSE 3001

# Define the command to run the application
# This assumes your entry point is dist/index.js
CMD [ "node", "dist/index.js" ]
