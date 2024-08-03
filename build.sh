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

# Restart the api
pm2 restart api
