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

# Restart the api
pm2 restart api
