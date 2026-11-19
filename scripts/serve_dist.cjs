const express = require('express');
const path = require('path');

const app = express();
const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distPath));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = 4173;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Production preview server listening at http://127.0.0.1:${PORT}`);
});
