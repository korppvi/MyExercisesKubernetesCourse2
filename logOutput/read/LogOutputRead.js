const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3001;

const randomStringPath = path.join(__dirname, 'random', 'string.txt');
const pongsPath = path.join(__dirname, 'pongs', 'pongs.txt');

let randomlyGeneratedString = '';
let pongs = '';

const server = http.createServer((req, res) => {

	try {
	  randomlyGeneratedString = fs.readFileSync(randomStringPath, 'utf8');
	} catch {
	  randomlyGeneratedString = '[No random string found]';
	}

  try {
	pongs = fs.readFileSync(pongsPath, 'utf8');
  } catch {
	pongs = '[No pongs count found]';
  }	
  
  res.setHeader('Content-Type', 'text/html');
  res.end(`${randomlyGeneratedString}<br>${pongs}`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
