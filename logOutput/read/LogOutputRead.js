const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const randomStringPath = path.join(__dirname, 'random', 'string.txt');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(fs.readFileSync(randomStringPath));
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
