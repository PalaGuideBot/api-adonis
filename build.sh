#!/bin/bash

# Fetch git
git fetch -a

# Pull git
git pull

# Install npm
npm install

# Build
npm run build

# Copy .env
cp .env build/

# Copy secrets
cp -r secrets build/

# Copy ecosystem.config.cjs
cp ecosystem.config.cjs build/

# Restart the api
pm2 restart api

# Restart the scheduler
pm2 restart scheduler
