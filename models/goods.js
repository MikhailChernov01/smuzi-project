1;
const { Schema, model } = require('mongoose');

const schemaGoods = new Schema({
  title: String,
  keywords: String,
  dateCreate: { type: Date, default: Date.now },
});

module.exports = model('Goods', schemaUsers);
