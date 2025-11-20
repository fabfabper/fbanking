# Minimal Dockerfile to run Mockoon CLI with a saved environment
# Build context is the repository root so we can COPY packages/api/mockoon-environment.json
FROM node:18-alpine

# Install mockoon-cli globally
RUN npm install -g @mockoon/cli

# Create app dir
WORKDIR /app

# Copy mockoon environment from monorepo
COPY packages/api/mockoon-environment.json ./environment.json

# Expose default Mockoon port
EXPOSE 3001

# Run mockoon-cli to start the environment
CMD ["mockoon-cli", "start", "--data", "./environment.json", "--port", "3001"]
