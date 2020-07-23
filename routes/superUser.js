const router = require('express').Router()
const sum = [25, 27, 21, 12, 45]
const data = ['01/01', '01/02', '01/03', '01/04', '01/05']
// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('../middleware/check')


  res.render('superUser');
});

router.get('/chart', function async (req, res) {
  
     res.send ({sum, data});
  });
module.exports = router;
