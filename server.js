const express = require('express');
const http = require('http');
const app = express();
const port = 3000;

const server = http.Server(app);

app.use('/', express.static('frontend/dist/ffa-tv'));

const buildLocation = 'frontend/dist/ffa-tv';
app.use((req, res, next) => {
  if (!req.originalUrl.includes(buildLocation)) {
    res.sendFile(`${__dirname}/${buildLocation}/index.html`);
  } else {
    next();
  }
});

server.listen(port, () => {
    console.info('Server started at port :' + port);
  });

