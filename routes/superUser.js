const router = require('express').Router();
const Goods = require('../models/goods');
const Users = require('../models/users');
const fs = require('fs');
// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('..error/middleware/check')
router.get('/', (req, res) => {
  const allUsers = Users.find();
  // console.log(allUsers)
  res.render('superUser');
});

const getListUsers = async () => {
  const users = await Users.find();
  let listUsersArr = [];

  users.forEach((el) => {
    let obj = {};
    obj.email = el.email;
    obj.username = el.username;
    obj.purchases = el.purchases.length;
    listUsersArr.push(obj);
  });

  return listUsersArr;
};

router.get('/customers', async (req, res) => {
  let arr = await getListUsers();
  console.log(arr);
  res.render('customers', { arr });
});

router.get('/downoload-list', async (req, res) => {
  let list = await getListUsers();
  const obj = {
    email: 'Email',
    username: 'Name',
    purchases: 'purchases',
  };

  let date = new Date();
  let day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
    seconds = date.getSeconds();

  let correctDate = `${day}-${month}-${year}(${seconds})`;

  // console.log(correctDate);
  // function* genId() {
  //   let id = 0;
  //   while (true) {
  //     yield id++;
  //   }
  // }

  // let date = new Date()

  list.unshift(obj);
  fs.writeFileSync(
    `dataUsers/users ${correctDate}.csv`,
    list
      .map((row) => `${row.username};${row.email};${row.purchases}`)
      .join('\n')
  );
  console.log(list);
  res.send(list);
});

async function getDashBoard(srok) {
  let goodsData = await Goods.find();

  let sortData = goodsData
    .map(
      (el) => el.dateCreate
      // .toString()
      // .match(/((\d{2})\s(\d{4}))/gim)
      // .join()
    )
    .sort((a, b) => a - b);
  // Number(a.slice(2)) - Number(b.slice(2)))
  // .sort((a, b) => {
  //   if (Number(a.slice(2)) > Number(b.slice(2))) {
  //     Number(a.slice(0, -5)) - Number(b.slice(0, -5));
  //   }
  // });

  sortData = sortData.map((el) => el.toString());
  sortData = new Set(sortData);
  sortData = [...sortData].slice(srok);
  let arrSum = [];
  for (let i = 0; i < sortData.length; i++) {
    let tempArr = [];
    for (let j = 0; j < goodsData.length; j++) {
      if (
        sortData[i].toString() == goodsData[j].dateCreate.toString()
        // .match(/((\d{2})\s(\d{4}))/gim)
        // .join()
      ) {
        tempArr.push(goodsData[j]);
      }
    }
    // let many = [`${tempArr.length * 150}$ / ${tempArr.length}`]
    // console.log(many)
    arrSum.push(tempArr.length * 170);
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
