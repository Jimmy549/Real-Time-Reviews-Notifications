#!/bin/bash

echo "🚀 Starting deployment process..."

# Build and push to GitHub
echo "📦 Building and pushing to GitHub..."
git add .
git commit -m "Production deployment: $(date)"
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Repository: https://github.com/Jimmy549/Real-Time-Reviews-Notifications"
echo "📋 Check your deployment platform for build status"