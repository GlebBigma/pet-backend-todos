// const express = require('express');
// const morgan = require('morgan');
// const chalk = require('chalk');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const todoRoutes = require('./routes/todo-routes');
//
// const errorMsg = chalk.bgKeyword('white').redBright;
// const successMsg = chalk.bgKeyword('green').whiteBright;
//
// const app = express();
//
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then((res) => console.log(successMsg('Connected to DB')))
//   .catch((error) => console.log(errorMsg(`Connection to DB error: ${error}`)));
//
// app.listen(process.env.PORT, 'localhost', (error) => {
//   error ? console.log(errorMsg(error)) : console.log(successMsg(`Server started on port ${process.env.PORT}`));
// });
//
// app.use(express.urlencoded({ extended: false }));
//
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
//
// app.use(todoRoutes);
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();
const todoRoutes = require('./routes/todo-routes');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').whiteBright;

const app = express();

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(`Connection to DB error: ${error}`)));

// Використання порту з Fly.io або дефолтного порту 8080
const port = process.env.PORT || 8080; // Якщо PORT не задано, використовуємо 8080 за замовчуванням
app.listen(port, '0.0.0.0', (error) => {  // Прив'язка до 0.0.0.0 дозволяє зовнішні з'єднання
  if (error) {
    console.log(errorMsg(error));
  } else {
    console.log(successMsg(`Server started on port ${port}`));
  }
});

// Мідлвари
app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Маршрути
app.use(todoRoutes);
