const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Смузи ждет!');
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
