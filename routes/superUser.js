const router = require('express').Router();
const Goods = require('../models/goods');
const Users = require('../models/users');
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('superUser');
});

const getListUsers = async () => {
  const users = await Users.find();
  const listUsersArr = [];

  users.forEach((el) => {
    const obj = {};
    obj.email = el.email;
    obj.username = el.username;
    obj.purchases = el.purchases.length;
    listUsersArr.push(obj);
  });
  return listUsersArr;
};

router.get('/customers', async (req, res) => {
  const arr = await getListUsers();
  res.render('customers', { arr });
});

router.get('/downoload-list', async (req, res) => {
  const list = await getListUsers();
  const obj = {
    email: 'Email',
    username: 'Name',
    purchases: 'purchases',
  };

  let date = new Date(),
     day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
    seconds = date.getSeconds();

  const correctDate = `${day}-${month}-${year}(${seconds})`;
  list.unshift(obj);
  fs.writeFileSync(
    `dataUsers/users ${correctDate}.csv`,
    list
      .map((row) => `${row.username};${row.email};${row.purchases}`)
      .join('\n')
  );
  res.send(list);
});

async function getDashBoard(srok) {
  const goodsData = await Goods.find();

  let sortData = goodsData
    .map((el) => el.dateCreate)
    .sort((a, b) => a - b)
    .map((el) => el.toString());

  sortData = new Set(sortData);
  sortData = [...sortData].slice(srok);
  const arrSum = [];
  let allSum = 0;
  let countSum = 0;

  for (let i = 0; i < sortData.length; i++) {
    const tempArr = [];
    for (let j = 0; j < goodsData.length; j++) {
      if (
        sortData[i] === goodsData[j].dateCreate.toString()
      ) {
        tempArr.push(goodsData[j]);
      }
    }

    arrSum.push(tempArr.length * 170);
    allSum += arrSum[i];
    countSum += tempArr.length;
  }

  const obj = {
    arrSum,
    sortData,
    allSum,
    countSum,
  };
  return obj;
}

router.get('/week', async (req, res) => {
  const obj = await getDashBoard(-7);

  res.send({
    obj,
  });
});

router.get('/mounth', async (req, res) => {
  const obj = await getDashBoard(-30);

  res.send({
    obj,
  });
});

router.get('/threeDays', async (req, res) => {
  const obj = await getDashBoard(-3);

  res.send({
    obj,
  });
});

module.exports = router;
