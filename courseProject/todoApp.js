
const http = require('http');

const portEnv = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('some response'); 
});

server.listen(portEnv, () => {
  console.log(`Server started in port ${portEnv}`);
});
