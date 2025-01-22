const express = require('express');
const {
  getTodos,
  addTodo,
  getTodo,
  deleteTodo,
  editTodo,
} = require('../controllers/todo-controller');

const router = express.Router();

router.get('/api/todos', getTodos);
router.post('/api/todo/', addTodo);
router.get('/api/todo/:id', getTodo);
router.delete('/api/todo/:id', deleteTodo);
router.put('/api/todo/:id', editTodo);

module.exports = router;
