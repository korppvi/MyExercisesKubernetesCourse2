const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const pongsPath = path.join(__dirname, 'pongs', 'pongs.txt');
let pongs = 0;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/pingpong') {
	pongs= pongs + 1
	fs.writeFileSync(pongsPath,`Ping / Pongs:  ${pongs}`)
  } else {
	res.end('<h1>Invalid path</h1>');
  }

  res.end('success');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
