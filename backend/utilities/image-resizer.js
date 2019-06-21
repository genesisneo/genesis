const path = require('path');
const sharp = require('sharp');

const imageResizer = (req, res) => {
  const correctUse = () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Correct use: "/resize?w=20&h=10&i=/images/0.jpg"');
  };

  if (Object.keys(req.query).length === 0) {
    return correctUse();
  }

  const {
    w: width = 20,
    h: height = 10,
    i: image = ''
  } = req.query;

  const imageWidth = parseInt(width, 10);
  const imageHeight = parseInt(height, 10);

  if (Number.isNaN(imageWidth)
    || Number.isNaN(imageHeight)
    || image === '') {
    return correctUse();
  }

  const rootDirectory = path.dirname(require.main.filename || process.mainModule.filename);
  const imageFilename = `${rootDirectory}/frontend/static${image}`;
  const imageExtension = image.split('.').pop();

  return sharp(imageFilename)
    .resize(imageWidth, imageHeight)
    .toBuffer()
    .then((imageData) => {
      res.writeHead(200, { 'Content-Type': `image/${imageExtension}` });
      res.end(imageData, 'binary');
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Sharp Error:\n', err);
    });
};

module.exports = imageResizer;
