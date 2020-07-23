const router = require('express').Router()
const Goods = require('../models/goods')
const sum = [25, 27, 21, 12, 45]
const data = ['01/01', '01/02', '01/03', '01/04', '01/05']
// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('..error/middleware/check')
router.get('/', function async (req, res) {
  res.render('superUser');
});

router.get('/chart', function async (req, res) {
      const arrData = await Goods.find().limit(7).map(el => el.dateCreate);
       console.log(arrData)
        // replace(
        //   /([0-9]{4})(-)([0-9]{2})(-)([0-9]{2}) ([0-9]{2}:[0-9]{2}:00)/g,
        //   '$5/$3/$1'));

        res.send({
          sum,
          arrData
        });
      }); module.exports = router;
