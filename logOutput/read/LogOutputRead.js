const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 3001;

const randomStringPath = path.join(__dirname, 'random', 'string.txt');

let randomlyGeneratedString = '';
let pongs = '';
const pongUrl = 'http://pingpong-svc:456/count';

async function fetchPongs(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (err) {
    console.error('Fetching count failed', err);
    return null;
  }
}

const server = http.createServer(async (req, res) => {

	try {
	  randomlyGeneratedString = fs.readFileSync(randomStringPath, 'utf8');
	} catch {
	  randomlyGeneratedString = '[No random string found]';
	}

  try {
	pongs = await fetchPongs(pongUrl);
  } catch {
	pongs = '[No pongs count found]';
  }	
  
  res.setHeader('Content-Type', 'text/html');
  res.end(`${randomlyGeneratedString}<br>${pongs}`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
