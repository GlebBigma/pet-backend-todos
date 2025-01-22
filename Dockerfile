# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.13.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Enable Corepack and use Yarn 4.4.1
RUN corepack enable && corepack prepare yarn@4.4.1 --activate

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Copy package.json and yarn.lock before installing dependencies to take advantage of Docker cache
COPY --link package.json yarn.lock ./

# Install all dependencies (dev and prod)
RUN yarn install

# Copy application code
COPY --link . .

# Final stage for app image
FROM base

# Copy built application from build stage
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "yarn", "run", "start" ]
