#!/bin/bash

# SEO Codex - Local Development Starter Script

echo "🚀 Starting SEO Codex Local Development Environment"
echo "=================================================="
echo ""

# Check if data directory exists
if [ ! -d "data" ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
fi

# Check if sample data exists
if [ ! -f "data/shows-sample.json" ]; then
    echo "⚠️  Warning: data/shows-sample.json not found"
    echo "   Please ensure you have the sample data file"
fi

echo "✓ Data directory ready"
echo ""

# Start the server
echo "🌐 Starting local web server..."
echo "   Server will be available at: http://localhost:8000"
echo ""
echo "📄 Test Pages:"
echo "   • All Shows Grid:    http://localhost:8000/test-offerings-grid.html"
echo "   • Individual Show:   http://localhost:8000/test-show-page.html"
echo "   • Tag Filter Page:   http://localhost:8000/test-tag-page.html"
echo "   • Data Loader Tool:  http://localhost:8000/examples/data-loading-guide.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================================="
echo ""

# Check which Python version is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python not found"
    echo "   Please install Python to run the local server"
    echo "   Or use: npm run serve"
    exit 1
fi
