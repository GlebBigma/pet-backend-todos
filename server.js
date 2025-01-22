const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();
const todoRoutes = require('./routes/todo-routes');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(`Connection to DB error: ${error}`)));

app.listen(process.env.PORT, 'localhost', (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Server started on port ${process.env.PORT}`));
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(todoRoutes);
