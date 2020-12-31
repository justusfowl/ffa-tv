const express = require('express');
const http = require('http');
const app = express();
const port = 3000;

const server = http.Server(app);

app.use('/', express.static('frontend/dist/ffa-tv'));

server.listen(port, () => {
    console.info('Server started at port :' + port);
  });

