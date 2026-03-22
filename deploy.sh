#!/bin/bash
set -e

echo "=== Residency24 Chatbot - Deployment Script ==="

# --------- 1. Pull latest code ---------
echo ""
echo "[1/5] Pulling latest code..."
git pull origin main

# --------- 2. Install dependencies ---------
echo ""
echo "[2/5] Installing dependencies..."
npm install --production

# --------- 3. Check .env file ---------
echo ""
echo "[3/5] Checking environment..."
if [ ! -f .env ]; then
  echo "ERROR: .env file not found!"
  echo "Create .env with: OPENAI_API_KEY=your-key-here"
  exit 1
fi

if ! grep -q "OPENAI_API_KEY" .env; then
  echo "ERROR: OPENAI_API_KEY not set in .env"
  exit 1
fi

echo ".env OK"

# --------- 4. Stop old process (if using PM2) ---------
echo ""
echo "[4/5] Restarting application..."
if command -v pm2 &> /dev/null; then
  pm2 delete residency24 2>/dev/null || true
  pm2 start server.js --name residency24
  pm2 save
  echo "Started with PM2"
else
  echo "PM2 not found. Install with: npm install -g pm2"
  echo "Starting directly with node..."
  echo "Run: node server.js"
fi

# --------- 5. Health check ---------
echo ""
echo "[5/5] Health check..."
sleep 2
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
  echo "SUCCESS: App is running on http://localhost:3000"
else
  echo "WARNING: App may not be ready yet. Check logs."
fi

echo ""
echo "=== Deployment Complete ==="
