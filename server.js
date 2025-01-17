const http = require('http');
const chalk = require('chalk');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const server = http.createServer((req, res) => {

});

server.listen(8080, 'localhost', (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg('Server started on port 8080'));
});
