import {
  postTodoModel,
  getTodosModel,
  putTodoModel,
  deleteTodoModel,
  completeTodoModel
} from '../../Model/sql/todos/todos.js';

export const getTodos = async (req, res) => {
  let org_id = req.query.org_id;

  let result = await getTodosModel(org_id);

  res.status(200).send(result);
};

export const postTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let status = req.body.status;
  let date = req.body.date;
  let org_id = req.body.org_id;
  

  await postTodoModel(title, description, author,status,date, org_id);

  res.status(200).send('Post Successful');
};

export const putTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let status = req.body.status;
  let date = req.body.date;
  let todo_id = req.body.todo_id;
 await putTodoModel(title, description, author, status,date, todo_id);
  res.status(200).send('Put Successful');
};

export const deleteTodo = async (req, res) => {
  let todo_id = req.query.todo_id;
  await deleteTodoModel(todo_id);
  res.status(200).send('Delete Successful');
};

export const completeTodo = async (req, res) => {
  let todo_id = req.query.todo_id;
  await completeTodoModel(todo_id);
  res.status(200).send('Todo completed successfully');
};