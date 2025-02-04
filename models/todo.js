const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
