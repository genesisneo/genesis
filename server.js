const fs = require('fs');
const path = require('path');
const spdy = require('spdy');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const imageResizer = require('./backend/utilities/image-resizer');
const data = require('./backend/data/genesis.json');

const server = express();
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

// security config
server.use(compression({ level: 9 }));
server.use(helmet.frameguard());
server.use(helmet.xssFilter({ setOnOldIE: true }));
server.use(helmet.hidePoweredBy());
server.use(helmet.hsts({ force: true }));
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());

// routes
server.use('/resize', imageResizer);
server.use('/images', express.static(`${__dirname}/frontend/static/images`, { maxAge: 2592000000 }));

// api data
server.get('/api/genesis', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.set('Cache-Control', 'public, max-age=2592000000');
  res.send(data);
});

// serving http port 80
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running at port ${process.env.PORT || 8080} for HTTP`); // eslint-disable-line no-console
});

if (!isDev) {
  server.use(express.static(path.join(__dirname, 'build')));
  server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  // serving hhtps port 443 through http2
  spdy.createServer({
    key: fs.readFileSync('./backend/ssl/genesis.key'),
    cert: fs.readFileSync('./backend/ssl/genesis.crt'),
    ca: fs.readFileSync('./backend/ssl/genesis.pem'),
  }, server)
    .listen(process.env.PORT || 8181, () => {
      console.log(`Server is running at port ${process.env.PORT || 8181} for HTTPS`); // eslint-disable-line no-console
    });
}
