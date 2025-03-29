#!/bin/bash

# Puppyporker Deployment Script
# This script helps deploy the frontend and backend to Vercel

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

# Deploy backend
echo "🔧 Deploying backend to Vercel..."
cd backend
vercel --prod
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed"
    exit 1
fi
echo "✅ Backend deployed successfully"

# Deploy frontend
echo "🎨 Deploying frontend to Vercel..."
cd ../frontend
vercel --prod
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed"
    exit 1
fi
echo "✅ Frontend deployed successfully"

echo "🎉 Deployment completed successfully!"
echo "🌐 Your application should now be available at:"
echo "   - Frontend: https://puppyporker.com"
echo "   - Backend API: https://api.puppyporker.com"
