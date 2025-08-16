const http = require('http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const serverport = parseInt(process.env.port, 10);
let pongs = 0;

const pool = new Pool({
  host: process.env.dbhost,
  port: parseInt(process.env.dbport, 10),
  user: process.env.dbusername,
  password: process.env.dbpassword, 
  database: process.env.dbname,
});

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
	try {
	  if (req.url === '/pingpong') {
		  
		await pool.query("INSERT INTO pongs (pong) VALUES ('pong')");
		
		res.end('success');
	  }
	  else if (req.url === '/count') {
		  
		const queryResult = await pool.query('SELECT COUNT(*) AS count FROM pongs');
		let pongs = queryResult.rows[0].count;   
		
		res.end(`Ping / Pongs:  ${pongs}`);
	  }
	  else {
		res.end('<h1>Invalid path</h1>');
	  }
  } catch (err) {
    console.error(err.message);
    res.end('Database error');
  }
  
});

server.listen(serverport, () => {
  console.log(`Server running on port ${serverport}`);
});
