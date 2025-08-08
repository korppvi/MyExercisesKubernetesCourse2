
const http = require('http');
const portEnv = process.env.PORT || 3000;
var pongs = 0

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/pingpong') {
	pongs= pongs + 1
    res.end(`<h1>pong ${pongs}</h1>`);
  } else {
    res.end('<h1>Invalid path</h1>');
  }
});

server.listen(portEnv, () => {
  console.log(`Server started on port ${portEnv}`);
});
