const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('short'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'live')));

app.get('*', (req, res, next) => {
  // (Unexpected token < error; After doing new deployments) When build doesn't include the chunk file it's looking for will end up here, handle the case by returning an error here, & catching in loading component to show reload button to refresh the browser to load new js files
  if (req.url.endsWith('.js') || req.url.endsWith('.css')) {
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
