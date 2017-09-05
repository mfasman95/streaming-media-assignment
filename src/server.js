const http = require('http');
const fileLoader = require('./fileLoading');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  switch (req.url) {
    case '/':
      fileLoader.loadFile(req, res, '../client/client.html', 'text/html');
      break;
    case '/page2':
      fileLoader.loadFile(req, res, '../client/client2.html', 'text/html');
      break;
    case '/page3':
      fileLoader.loadFile(req, res, '../client/client3.html', 'text/html');
      break;
    case '/favicon.ico':
      fileLoader.loadFile(req, res, '../client/favicon.ico', 'image/x-icon');
      break;
    case '/party.mp4':
      fileLoader.loadFile(req, res, '../client/party.mp4', 'video/mp4');
      break;
    case '/bird.mp4':
      fileLoader.loadFile(req, res, '../client/bird.mp4', 'video/mp4');
      break;
    case '/bling.mp3':
      fileLoader.loadFile(req, res, '../client/bling.mp3', 'audio/mpeg');
      break;
    default:
      fileLoader.loadFile(req, res, '../client/client.html', 'text/html');
      break;
  }
};

http.createServer(onRequest).listen(port, () => console.log(`Listening on 127.0.0.1:${port}`));
