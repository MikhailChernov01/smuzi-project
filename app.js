const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use static folder
app.use(express.static(path.join(__dirname,'public')));

//use logger
app.use(morgan('dev'));

//use view, hbs connection
const hbs = exphbs.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'public', 'templates'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
// use partials


app.get('/', function (req, res) {
  res.render('index');
});

//Эта функция выполняет конект мангуса,а также подключение сервака и выдает ошибку в случае неудачи
async function start() {
  try {
    await mongoose.connect('mongodb+srv://Ribozavr:PSZ9md1234@cluster0.at1bq.mongodb.net/Smuzi', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(port, function () {
      console.log(`Listening port ${port}!`);
    });
  } catch (e) {
    console.log(e);
  }
}

start()
