const router = require('express').Router();
const Goods = require('../models/goods');
const Users = require('../models/users');
// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('..error/middleware/check')
router.get('/', (req, res) => {
  // console.log(allUsers)
  res.render('superUser');
});

router.get('/customers', async (req, res) => {
  const users = await Users.find();
  const arr = [];

  users.forEach((el) => {
    let obj = {};
    obj.email = el.email;
    obj.username = el.username;
    obj.purchases = el.purchases.length;
    arr.push(obj);
  });
  console.log(arr);
  res.render('customers', { arr });
});

router.get('/customers', (req, res) => {
  res.send({ name: 'aaa' });
});

async function getDashBoard(srok) {
  let goodsData = await Goods.find();

  let sortData = goodsData
    .map((el) =>
      el.dateCreate
        .toString()
        .match(/((\d{2})\s(\d{4}))/gim)
        .join()
    )
    .sort((a, b) => Number(a.slice(2)) - Number(b.slice(2)))
    .sort((a, b) => {
      if (Number(a.slice(2)) > Number(b.slice(2))) {
        Number(a.slice(0, -5)) - Number(b.slice(0, -5));
      }
    });

  // sortData = sortData.map((el) => el.toString());
  sortData = new Set(sortData);
  sortData = [...sortData].slice(srok);
  let arrSum = [];
  for (let i = 0; i < sortData.length; i++) {
    let tempArr = [];
    for (let j = 0; j < goodsData.length; j++) {
      if (
        sortData[i] ==
        goodsData[j].dateCreate
          .toString()
          .match(/((\d{2})\s(\d{4}))/gim)
          .join()
      ) {
        tempArr.push(goodsData[j]);
      }
    }
    // let many = [`${tempArr.length * 150}$ / ${tempArr.length}`]
    // console.log(many)
    arrSum.push(tempArr.length);
  }
  return [arrSum, sortData];
}

router.get('/week', async (req, res) => {
  const result = await getDashBoard(-7);
  let arrSum = result[0];
  let sortData = result[1];
  res.send({
    arrSum,
    sortData,
  });
});

router.get('/mounth', async (req, res) => {
  const result = await getDashBoard(-30);
  let arrSum = result[0];
  let sortData = result[1];
  res.send({
    arrSum,
    sortData,
  });
});

router.get('/threeDays', async (req, res) => {
  const result = await getDashBoard(-3);
  let arrSum = result[0];
  let sortData = result[1];
  res.send({
    arrSum,
    sortData,
  });
});

module.exports = router;
