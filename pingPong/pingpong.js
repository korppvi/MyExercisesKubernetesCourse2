const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
let pongs = 0;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/pingpong') {
	pongs= pongs + 1
	res.end('success');
  }
  else if (req.url === '/count') {
	res.end(`Ping / Pongs:  ${pongs}`);
  }
  else {
	res.end('<h1>Invalid path</h1>');
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
