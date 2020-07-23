const router = require('express').Router();
const error = require('../middleware/error');
const User = require('../models/users')
const Good = require('../models/goods')
const GoodExist = require('../models/goodsExist')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  checkSession,
  checkVerification,
  cookiesCleaner
} = require('../middleware/check');
//const {findOne} = require('../models/users');


router.get('/', function (req, res) {
  res.render('index');
});

router.post('/promocode', (req, res) => {
  res.render('promocode')
})

router.post('/register', async (req, res) => {
  let {
    promocode
  } = req.body
  let goodExist = await GoodExist.findOne({
    keywords: promocode
  })
  if (goodExist !== null) {
    res.render('register')
  } else {
    //res.redirect('/promocode')
    res.render('promocode')
  }
})
router.post('/register/create', async(req,res)=>{
  console.log(12);
  try{
    const { username, email, password } = req.body;
    const user = new User({
          username,
          email,
          password: await bcrypt.hash(password, saltRounds),
        });
        await user.save();
        req.session.user = user;
  }catch{
    next(error);
  }
  res.redirect('/users/home')
})





module.exports = router


// try {
//   const { username, email, password } = req.body;
//   const user = new User({
//     username,
//     email,
//     password: await bcrypt.hash(password, saltRounds)
//   });
//   await user.save();
//   req.session.user = user;
//   res.redirect("/dashboard");
// } catch (error) {
//   next(error);
// }
