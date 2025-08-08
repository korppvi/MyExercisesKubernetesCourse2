const http = require('http');
const { v4: uuidv4 } = require('uuid');

const randomlyGeneratedString = uuidv4();
const port = process.env.PORT || 3000;

setInterval(() => {
    console.log(`${new Date().toISOString()}: ${randomlyGeneratedString}`);
}, 5000);

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(randomlyGeneratedString);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
