const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const PORT = 8080;

const app = express();

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Server started on port ${PORT}`));
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
