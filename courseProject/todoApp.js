const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');

const todoApp = express();

const port = parseInt(process.env.PORT, 10);
const pagePath = path.join(__dirname, process.env.PAGE);
const picturePath = path.join(__dirname,'images',process.env.PICTURE);

const imageUrl = process.env.IMAGE;
const backEndTodo = process.env.BACKEND

let fetch = !(fs.existsSync(picturePath));
let cache = null;
let data = null;
let timeoutId;

todoApp.use(express.json());

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

async function addTodo(value) {

	const response = await axios.post(
      backEndTodo+'/add',
      { todo: value },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Todo added');
	return response.data; 
}

function readFromFile(path) {
  try {
    return fs.readFileSync(path);
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

todoApp.get('/', (req, res) => {
   let data = readFromFile(pagePath);
   res.type('html').send(data); 
});

todoApp.get('/image', async (req, res) => {
	
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
		  cache = readFromFile(picturePath);
		  data = cache;
		}
	  }
	res.type('jpeg');
	res.send(data);
});

todoApp.post('/add', async (req, res) => {
  data = await addTodo(req.body.todo)
  res.json(data);
});

todoApp.get('/todos', async (req, res) => {
  try {
	const response = await axios.get(backEndTodo+'/todos');
	res.json(response.data);
  } catch (error) {
    res.status(500).json({ failure: 'database error' });
  }
});

todoApp.listen(port, () => {
  console.log(`Server running at ${port}`);
});
