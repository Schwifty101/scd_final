FROM node:18-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source
COPY . .

ENV NODE_ENV=production
CMD ["node", "main.js"]
