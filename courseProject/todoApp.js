
const http = require('http');

const portEnv = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(`<h1>Hello, World</h1>`);
});

server.listen(portEnv, () => {
  console.log(`Server started in port ${portEnv}`);
});
