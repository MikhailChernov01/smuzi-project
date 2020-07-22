const express = require("express");
const path = require('path');
const morgan = require('morgan')
const exphbs = require('express-handlebars');

const app = express();

// Use URL uncoder which using in POST requests
app.use(express.urlencoded({extended: true}));
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

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening port ${port}!`);
});
