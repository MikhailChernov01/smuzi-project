// Это товары, которые будут куплены юзером. Они будут пушиться в массив покупок юзера. 
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const schemaGoods = new Schema({
  title: String,
  keywords: String,
  dateCreate: { type: Date, default: Date.now },
});

const Good = model('Goods', schemaGoods);
module.exports = Good;

