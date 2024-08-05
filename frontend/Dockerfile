#Base img
FROM node:20.16.0-alpine3.20

# group and user
RUN addgroup -S web && adduser -S web -G web

# Set user
USER web

# Set working directory
WORKDIR /web

# Copy package.json
COPY --chown=web package*.json ./

# Install dependencies
RUN npm i

# Copy app source
COPY --chown=web . .

# Expose port
EXPOSE 4000

# start app
CMD ["npm", "run" ,"dev"]