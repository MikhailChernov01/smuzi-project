const router = require('express').Router();
const Goods = require('../models/goods');

// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('..error/middleware/check')
router.get('/', (req, res) => {
  res.render('superUser');
});

router.get('/chart', async (req, res) => {
  let goodsData = await Goods.find();
  goodsData.map((el) => console.log(el.dateCreate));
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
  sortData = [...sortData].slice(-7);
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
    arrSum.push(tempArr.length);
  }

  res.send({
    arrSum,
    sortData,
  });
});

module.exports = router;
