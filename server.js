const http = require('http');
const chalk = require('chalk');

const PORT = 8080;

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const server = http.createServer((req, res) => {

});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Server started on port ${PORT}`));
});
