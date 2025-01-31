const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();
const todoRoutes = require('./routes/todo-routes');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(`Connection to DB error: ${error}`)));

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', (error) => {
  if (error) {
    console.log(errorMsg(error));
  } else {
    console.log(successMsg(`Server started on port ${port}`));
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

app.use(todoRoutes);
