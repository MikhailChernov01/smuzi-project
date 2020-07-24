// Это товары, которые будут куплены юзером. Они будут пушиться в массив покупок юзера. 
const mongoose = require('mongoose');
const faker = require('faker')
const { Schema, model } = require('mongoose');

const schemaGoods = new Schema({
  title: String,
  keywords: String,
  dateCreate: { type: Date, default: Date.now },
});

const Good = model('Goods', schemaGoods);
module.exports = Good;

// async function createGood() {
//   let date = []
// let tovarArr = []
//   for(let i = 0; i < 10; i++) {
//   let dateNow = faker.date.past()
//   date.push(dateNow)
//   let tovar = {
//     tittle:  faker.commerce.productName(),
//     keywords: faker.random.number(),
//   };
//   tovarArr.push(tovar)
//   }
//   for(let i = 0; i < 50; i++) {
//     let random = [~~(Math.random() * (tovarArr.length - 0) + 0)]
//     let x = new Good({
//       title: tovarArr[random].tittle,
//       keywords: tovarArr[random].keywords,
//       dateCreate: date[~~(Math.random() * (date.length - 0) + 0)]
//     });
//     console.log(x)
//    await x.save();
//   }
 
// }

// createGood()