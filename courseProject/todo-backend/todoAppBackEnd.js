const express = require('express');
const todoBackend = express();
const port = parseInt(process.env.PORT, 10);

let todos = ['todo1', 'todo2', 'todo3'];

todoBackend.use(express.json());

todoBackend.get('/todos', (req, res) => {
  res.json(todos);
});

todoBackend.post('/add', (req, res) => {
  todos.push(req.body.todo);
  res.json(todos);
});

todoBackend.listen(port, () => {
  console.log(`Server running at ${port}`);
});
