const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const port = process.env.PORT || 3000;
const picturePath = path.join(__dirname,'images','random.jpg');
const imageUrl = 'https://picsum.photos/1200';

let fetch = !(fs.existsSync(picturePath));
let cache = null;
let data = null;
let timeoutId;

if(!fetch) {
	console.log('Startup: Picture already exists. Set timeout for picture change');
	runJob();
}

async function fetchImageFromExternalSource(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(picturePath, response.data);
    console.log('Fetching and writing picture to disk succeeded');
    return response.data;
  } catch (err) {
    console.error('Fetching image failed', err);
    return null;
  }
}

function readFromFile() {
  try {
    return fs.readFileSync(picturePath);
  } catch (err) {
    console.error('Reading picture failed', err);
    return null;
  }
}

function runJob() {
  console.log("Setting timed job");
  timeoutId = setTimeout(() => {
	console.log("Timeout: update picture");
    fetch = true;
  }, 10 * 60 * 1000);
}

const server = http.createServer(async (req, res) => {

	
  if (req.url === '/image') {
	  if (fetch) {
		  
			console.log('Fetch was true');
			  
			if (cache) {
			
				  console.log('Reading image from cache. Fetching not done');
				  
				  data = cache;
				  cache = null;
			} else {
				
				  console.log('Cache was empty. Fetching image from external source');
				  
				  data = await fetchImageFromExternalSource(imageUrl);
				  runJob();
				  fetch = false;
			}
	  } else {
		if (cache) {
		
		  console.log('Reading image from cache. no file read from volume');
			
		  data = cache;
		} else {
		
		  console.log('Cache was empty. Reading file from volume');
		  
		  cache = readFromFile();
		  data = cache;
		}
	  }

	  if (!data) {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('Error loading image');
		return;
	  }

	  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
	  res.end(data);
  
  } 
  else if(req.url === '/') {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(`<html>
<body>
  <h1>Todo</h1>

  <img src="/image"  width="150">

  <br><br>
  <input type="text" id="todo" maxlength="140">
  <button>Send</button>

  <h2>Todos</h2>
  <ul>
    <li>todo1</li>
    <li>todo2</li>
    <li>todo3</li>
  </ul>

</body>
</html>
`);
	return;
  }
  else {
    res.end('<h1>Invalid path</h1>');
	return;
  }
  
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
