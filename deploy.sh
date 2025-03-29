#!/bin/bash

# Puppyporker Deployment Script
# This script helps deploy the monorepo to Vercel

echo "🚀 Puppyporker Deployment Script"
echo "==============================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it with: npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
echo "🔑 Checking Vercel authentication..."
vercel whoami || (echo "❌ Please login to Vercel first with: vercel login" && exit 1)

# Deploy the monorepo to Vercel
echo "🔧 Deploying Puppyporker to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should now be available at:"
echo "   - Frontend: https://puppyporker.com"
echo "   - Backend API: https://puppyporker.com/api"

echo ""
echo "📝 Note: If you want to use custom domains, you'll need to configure them in the Vercel dashboard"
echo "   and update your DNS settings on Hostinger."
