const express = require('express');
const chalk = require('chalk');

const app = express();

const PORT = 8080;

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Server started on port ${PORT}`));
});
