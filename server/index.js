const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('short'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'live')));

app.get('*', (req, res, next) => {
  if (req.url.endsWith('.js')) {
    return res.send(`(console.error('${req.url}'))`);
  }
  next();
});

app.get('*', (_req, res, _next) => {
  res.sendFile(path.resolve(__dirname, '..', 'live', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});
