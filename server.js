const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const mongoose = require('mongoose');
const config = require('./config');
const todoRoutes = require('./routes/todo-routes');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const app = express();

mongoose
  .connect(config.mongoURL)
  .then(() => console.log(successMsg('✅ Connected to DB')))
  .catch((error) => {
    console.error(errorMsg(`❌ Connection to DB error: ${error.message}`));
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api', todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(errorMsg(`❌ Server error: ${err.message}`));
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, config.hostname, (error) => {
  if (error) {
    console.error(errorMsg(error));
  } else {
    console.log(successMsg(`🚀 Server started on ${config.hostname}:${config.port} in ${config.env} mode`));
  }
});
