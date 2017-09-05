const http = require('http');
const fileLoader = require('./fileLoading');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  switch (req.url) {
    case '/': return fileLoader.loadFile(req, res, '../client/client.html', 'text/html');
    case '/page2': return fileLoader.loadFile(req, res, '../client/client2.html', 'text/html');
    case '/page3': return fileLoader.loadFile(req, res, '../client/client3.html', 'text/html');
    case '/favicon.ico': return fileLoader.loadFile(req, res, '../client/favicon.ico', 'image/x-icon');
    case '/party.mp4': return fileLoader.loadFile(req, res, '../client/party.mp4', 'video/mp4');
    case '/bird.mp4': return fileLoader.loadFile(req, res, '../client/bird.mp4', 'video/mp4');
    case '/bling.mp3': return fileLoader.loadFile(req, res, '../client/bling.mp3', 'audio/mpeg');
    default: return fileLoader.loadFile(req, res, '../client/client.html', 'text/html');
  }
};

http.createServer(onRequest).listen(port, () => console.log(`Listening on 127.0.0.1:${port}`));
