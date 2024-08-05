#Base img
FROM node:20.16.0-alpine3.20

# group and user
RUN addgroup -S api && adduser -S api -G api

# Set user
USER api

# Set working directory
WORKDIR /api

# Copy package.json
COPY --chown=api package*.json ./

# Install dependencies
RUN npm i

# Copy app source
COPY --chown=api . .

# Expose port
EXPOSE 3000

# start app
CMD ["npm", "run" ,"dev"]