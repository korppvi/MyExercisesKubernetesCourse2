const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const randomStringPath = path.join(__dirname, 'random', 'string.txt');
const randomlyGeneratedString = uuidv4();

setInterval(() => {
	console.log('writing random string to file');
	fs.writeFileSync(randomStringPath, `${new Date().toISOString()}: ${randomlyGeneratedString}`);
	console.log('Write file succeeded');
}, 5000);

