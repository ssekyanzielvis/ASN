#!/bin/bash

# Netlify Build Script for Frontend
# This script runs during Netlify deployment

echo "Starting frontend build..."

# Install dependencies
npm ci

# Build the React app
npm run build

echo "Build completed successfully!"
