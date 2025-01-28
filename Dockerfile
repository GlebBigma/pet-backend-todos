# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.13.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Enable Corepack and use Yarn 4.4.1
RUN corepack enable && corepack prepare yarn@4.4.1 --activate

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Copy package.json and yarn.lock before installing dependencies to use Docker cache efficiently
COPY package.json yarn.lock ./

# Install all dependencies (dev and prod)
RUN yarn install

# Copy the rest of the application code after dependencies are installed
COPY . .

# Final stage for app image
FROM base

# Expose the port for the application
EXPOSE 8080

# Copy dependencies and application code from build stage
COPY --from=build /app /app

# Make sure dependencies are installed in the final image
WORKDIR /app
RUN yarn install

# Start the server using 'yarn run dev'
CMD ["yarn", "run", "dev"]
