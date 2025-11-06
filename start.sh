#!/bin/bash

# Script to run both frontend and backend servers

echo "🚀 Starting Control Evalua Ya..."
echo ""

# Check if .env exists in server directory
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env not found!"
    echo "📝 Please create server/.env with your GEMINI_API_KEY"
    echo "   You can copy server/.env.example and add your API key"
    echo ""
    exit 1
fi

# Check if .env exists in root
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file"
fi

echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Install backend dependencies
if [ ! -d "server/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd server && npm install && cd ..
fi

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🔧 Starting servers..."
echo "   - Frontend: http://localhost:8080"
echo "   - Backend:  http://localhost:3001"
echo ""

# Start both servers using npx concurrently
npx concurrently -n "frontend,backend" -c "cyan,green" \
    "npm run dev" \
    "cd server && npm run dev"
