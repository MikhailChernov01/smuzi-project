const router = require('express').Router()
const Goods = require('../models/goods')

// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('..error/middleware/check')
router.get('/',  (req, res) =>{
  res.render('superUser');
});


router.get('/chart',  async (req, res) => {
      const arrData = await Goods.find().limit(7).map(el => el.dateCreate).replace(
          /([0-9]{4})(-)([0-9]{2})(-)([0-9]{2}) ([0-9]{2}:[0-9]{2}:00)/g,
          '$5/$3/$1');
console.log(arrData)
        // res.send({
        //   sum,
        //   arrData
        // });
      });
    
      module.exports = router;

