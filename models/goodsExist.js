// Это товары, которые существуют у нас в смузийной.
// При вводе кода товара мы будем проверять его наличие.
// На следующем шаге в массив юзера будет добавляться товар.
// Поля  title и keywords будут копироваться в goods и уже этот чувак у которого будет уже дата его добавления лететь в массив юзера.

const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const schemaGoodsExist = new Schema({
  title: String,
  keywords: String,
  cost: Number,
  dateCreate: { type: Date, default: Date.now },
});

const GoodExist = model('GoodsExist', schemaGoodsExist);
module.exports = GoodExist;
