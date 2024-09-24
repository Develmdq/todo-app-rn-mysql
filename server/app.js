import express from "express";
import {
  getTodosById,
  getTodoById,
  getSharedTodoById,
  getUserById,
  getUserByEmail,
  createTodo,
  deleteTodo,
  toogleCompleted,
  shareTodo,
} from "./database.js";


const app = express().use(express.json());

app.listen(8080, (err) => {
  if (err) {
    console.log('Error',err)
  } else {
    console.log('Servidor en puerto 8080')
  }
})

app.get("/todos/:id", async (req, res) => {
  // recupera todos x id
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
});

app.get('/todos/shared_todos/:id', async (req, res) => { // recupera todos compartidos x id
  const todo = await getSharedTodoById(req.params.id);
  const author = await getUserById(todo.user_id)
  const shared_witch = await getUserById(todo.shared_witch_id)
  res.status(200).send({ todo, author, shared_witch });
});

app.get('/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).send(user)
});

app.put('/todos/:id', async (req, res) => {
  const { value } = req.body;
  const todo = await toogleCompleted(req.params.id, value);
  res.status(200).send(todo)
});

app.delete('/todos/:id', async (req, res) => {
  await deleteTodo(req.params.id);
  res.send({message: 'Todo delete successfully'})
});

app.post('/todos/shared_todos', async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
  res.status(201).send(sharedTodo)
})

app.post('/todos', async (req, res) => {
  const { user_id, title } = req.body;
  const todo = await createTodo(user_id, title);
  res.status(200).send(todo)
})
