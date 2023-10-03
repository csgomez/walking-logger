# Stage 1: Build the client
FROM node:18-alpine as client-builder

WORKDIR /app/client

# install frontend dependencies
COPY client/package*.json ./
RUN npm ci

# Copy and build the client code
COPY client/ ./
RUN npm run build

# Stage 2: Build the server and use the built client
FROM node:18-alpine

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci

# Copy the built client from the previous stage
COPY --from=client-builder /app/client/dist ./dist

COPY server/ ./

EXPOSE 3001

CMD ["npm", "start"]