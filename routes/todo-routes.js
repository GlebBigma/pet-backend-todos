const express = require('express');
const {
  getTodos,
  addTodo,
  getTodo,
  deleteTodo,
  editTodo,
} = require('../controllers/todo-controller');

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todo/', addTodo);
router.get('/todo/:id', getTodo);
router.delete('/todo/:id', deleteTodo);
router.put('/todo/:id', editTodo);

module.exports = router;
