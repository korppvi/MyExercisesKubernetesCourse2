
const { v4: uuidv4 } = require('uuid');

const randomlyGeneratedString = uuidv4();

setInterval(() => {
    console.log(`${(new Date().toISOString())}: ${randomlyGeneratedString}`);
}, 5000);
