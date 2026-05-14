# Stage 1: Build the frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the server code
COPY server/ ./server/

# Copy the built frontend from Stage 1
COPY --from=build-frontend /app/dist ./dist

# Create a volume for the SQLite database to ensure data persistence
VOLUME /app/data
ENV DATABASE_URL=/app/data/wep_database.sqlite

# Update server to use the database in the volume (optional, can be done via ENV in code)
# For now, the code uses './wep_database.sqlite' in the root, so let's make sure it's accessible.

EXPOSE 5000
CMD ["node", "server/index.js"]
