const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9999;

const COUNT_FILE = path.join(__dirname, 'count.txt');
let count = 0;

// Load saved count
if (fs.existsSync(COUNT_FILE)) {
  count = Number(fs.readFileSync(COUNT_FILE, 'utf8')) || 0;
}

// Helper to save count
function saveCount() {
  fs.writeFileSync(COUNT_FILE, String(count));
}

const server = http.createServer((req, res) => {
  // ----------------------------
  // 1️⃣ Visitor count API
  // ----------------------------
  if (req.url === '/api/visit' && req.method === 'GET') {
    count += 1;      // increment on each visit
    saveCount();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count }));
    return;
  }

  // ----------------------------
  // 2️⃣ Serve website files
  // ----------------------------
  let filePath = req.url === '/' ? 'home.html' : req.url.slice(1);
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Page not found');
      return;
    }

    // Determine content type
    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.js')) contentType = 'application/javascript';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});