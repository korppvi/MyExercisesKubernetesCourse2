const express = require('express');
const todoBackend = express();
const { Pool } = require('pg');
const port = parseInt(process.env.PORT, 10);

const pool = new Pool({
  host: process.env.dbhost,
  port: parseInt(process.env.dbport, 10),
  user: process.env.dbusername,
  password: process.env.dbpassword, 
  database: process.env.dbname,
});


todoBackend.use(express.json());

todoBackend.get('/todos', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT TODO FROM TODOS');
    const todos = queryResult.rows.map(row => row.todo);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ failure: 'database error' });
  }
});


todoBackend.post('/add',async (req, res) => {
  
	let newtodo = req.body.todo
	let todos = '[]'
  
	if (newtodo.length <= 140) {
		
		await pool.query("INSERT INTO TODOS (TODO) VALUES ($1)", [newtodo]);
		const queryResult = await pool.query("SELECT TODO FROM TODOS");
		todos = queryResult.rows.map(row => row.todo);
		
		console.log('new todo added: '+newtodo)
	}
	else {
		console.error('Todo is too long: '+newtodo)
	}
  
  res.json(todos);
});

todoBackend.listen(port, () => {
  console.log(`Server running at ${port}`);
});
