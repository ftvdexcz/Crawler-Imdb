const http = require('http');
const fs = require('fs');

const port = 8888;

const httpServer = http.createServer(httpHandler);

httpServer.listen(port, () => {
  console.log(`HTTP server running at port: ${port}/`);
});

function httpHandler(req, res) {
  fs.readFile('./' + req.url, function (err, data) {
    if (err == null) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    }
  });
}
