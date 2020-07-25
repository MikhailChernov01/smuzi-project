const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const methodOverride = require('method-override');
const error = require('./middleware/error');
const { checkSession, checkVerification, cookiesCleaner } = require('./middleware/check');

const port = process.env.PORT || 3000;

const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const superRouter = require('./routes/superUser');
const goodsRouter = require('./routes/goods');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use static folder
app.use(express.static(path.join(__dirname, 'public')));

// use logger, cookieParser
app.use(morgan('dev'));
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3000000,
    },
  }),
);

// use view, hbs connection
const hbs = exphbs.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'public', 'templates'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Allows you to use PUT, DELETE with forms.
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// app.use(cookiesCleaner);
//Это переключатель с использованием глобальной переменной. Благодаря этому в ЛК появляются нужные поля.
app.use((req, res, next) => {
  if (req.session.user) {
    app.locals.user = req.session.user;
  } else{
    app.locals.user =null
  }
  next();
});

app.use('/', indexRouter);
// app.use(checkVerification);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
app.use('/super', superRouter);

app.use(error);

// Эта функция выполняет конект мангуса,а также подключение сервака и выдает ошибку в случае неудачи
async function start() {
  try {
    await mongoose.connect('mongodb+srv://Ribozavr:PSZ9md1234@cluster0.at1bq.mongodb.net/Smuzi', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(port, () => {
      console.log(`Listening port ${port}!`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
