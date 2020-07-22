const express = require("express");
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Смузи ждет!');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening port ${port}!`);
});
