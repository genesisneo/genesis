const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const imageResizer = require('./backend/utilities/image-resizer');
const data = require('./backend/data/genesis.json');

const server = express();
const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

// security config
server.use(compression({ level: 9 }));
server.use(helmet.frameguard());
server.use(helmet.xssFilter({ setOnOldIE: true }));
server.use(helmet.hidePoweredBy());
server.use(helmet.hsts({ force: true }));
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());

// static files
server.use(express.static('build'));

// routes
server.use('/resize', imageResizer);
server.use('/images', express.static(`${__dirname}/frontend/static/images`, { maxAge: 86400000 }));

// api data
server.get('/api/genesis', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(data);
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running at port ${process.env.PORT || 8080} for HTTP`); // eslint-disable-line no-console
});

if (isProd) {
  server.get('*', (req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
  });

  https.createServer({
    key: fs.readFileSync('./backend/ssl/genesis.key'),
    cert: fs.readFileSync('./backend/ssl/genesis.crt'),
    ca: fs.readFileSync('./backend/ssl/genesis.pem'),
  }, server)
    .listen(process.env.PORT || 8181, () => {
      console.log(`Server is running at port ${process.env.PORT || 8181} for HTTPS`); // eslint-disable-line no-console
    });
}
