const Todo = require('../models/todo');

const handleError = (res, error) => {
  res.status(500).send(error.message);
}

const transformTodo = (todo) => {
  return {
    id: todo._id.toString(),
    title: todo.title,
    message: todo.message,
    completed: todo.completed,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt
  };
}

const getTodos = (req, res) => {
  Todo
    .find()
    .sort({ createdAt: -1 })
    .then((todos) => {
      const transformedTodos = todos.map(transformTodo);
      res.status(200).json(transformedTodos)
    })
    .catch((error) => handleError(res, error));
}

const addTodo = (req, res) => {
  const { title, message, completed } = req.body;
  const todo = new Todo({ title, message, completed });
  todo
    .save()
    .then((todo) => res.status(200).json(transformTodo(todo)))
    .catch((error) => handleError(res, error));
}

const getTodo = (req, res) => {
  Todo
    .findById(req.params.id)
    .then((todo) => res.status(200).json(transformTodo(todo)))
    .catch((error) => handleError(res, error));
}

const deleteTodo = (req, res) => {
  const { id } = req.params;
  Todo
    .findByIdAndDelete(id)
    .then((todo) => res.status(200).json({id}))
    .catch((error) => handleError(res, error));
}

const editTodo = (req, res) => {
  const { title, message, completed } = req.body;
  const { id } = req.params;
  Todo
    .findByIdAndUpdate(id, { title, message, completed }, { new: true })
    .then((todo) => res.json(transformTodo(todo)))
    .catch((error) => handleError(res, error));
}

module.exports = {
  getTodos,
  addTodo,
  getTodo,
  deleteTodo,
  editTodo,
};
