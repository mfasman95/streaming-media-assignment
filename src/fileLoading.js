const fs = require('fs');
const path = require('path');


const streamData = (req, res, file, stats, type) => {
  const range = req.headers.range;

  if (!range) return res.writeHead(416);

  const positions = range.replace(/bytes=/, '').split('-');

  let start = parseInt(positions[0], 10);

  const total = stats.size;
  const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

  if (start > end) start = end - 1;

  const chunksize = (end - start) + 1;

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${total}`,
    'Accept-Range': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': type,
  });

  const stream = fs.createReadStream(file, { start, end });

  stream.on('open', () => stream.pipe(res));

  stream.on('error', streamErr => res.end(streamErr));

  return stream;
};

const loadFavIcon = (req, res, file, type) => {
  // Error handling is being done in the 'loadFile' function
  fs.readFile(file, (err, data) => {
    res.writeHead(200, { 'Content-Type': type });
    res.write(data);
    res.end();
  });
};

const loadPage = (req, res, file, type) => {
  // Error handling is being done in the 'loadFile' function
  fs.readFile(file, (err, data) => {
    res.writeHead(200, { 'Content-Type': type });
    res.write(data);
    res.end();
  });
};

module.exports.loadFile = (req, res, loc, type) => {
  const file = path.resolve(__dirname, loc);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') res.writeHead(404);
      return res.end();
    }

    switch (type) {
      case 'video/mp4':
        return streamData(req, res, file, stats, type);
      case 'audio/mpeg':
        return streamData(req, res, file, stats, type);
      case 'text/html':
        return loadPage(req, res, file, type);
      case 'image/x-icon':
        return loadFavIcon(req, res, file, type);
      default:
        res.writeHead(404, { 'Content-Type': 'plain' });
        return res.end('Invalid Content Type Specified');
    }
  });
};
