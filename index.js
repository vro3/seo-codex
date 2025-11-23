const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from various directories
app.use('/code', express.static(path.join(__dirname, 'code')));
app.use('/loaders', express.static(path.join(__dirname, 'loaders')));
app.use('/brand', express.static(path.join(__dirname, 'brand')));
app.use('/metadata', express.static(path.join(__dirname, 'metadata')));

// Serve HTML loaders with proper MIME types
app.use(express.static(__dirname, {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

// Route for show pages
app.get('/stage-shows/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'code/loaders/universal_show_loader_latest.html'));
});

// Route for filtered/tag pages
app.get('/filtered-shows', (req, res) => {
  res.sendFile(path.join(__dirname, 'code/loaders/universal_tag_page_loader_v1.9.html'));
});

// Route for offerings grid
app.get('/offerings', (req, res) => {
  res.sendFile(path.join(__dirname, 'code/loaders/offerings_grid_v2.3.1.html'));
});

// Default route - serve README as plain text
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'README.md'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'seo-codex' });
});

app.listen(PORT, () => {
  console.log(`SEO Codex server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
