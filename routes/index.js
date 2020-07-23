const router = require('express').Router();
const checkError = require('../middleware/error');
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
    res.render('promocode')
  }
})

router.post('/users/home', async (req, res) => {
  console.log(req.body);
  try {
    const {username:
      username,
      email,
      password
    } = req.body;
    const user = await User.create({
      username,
      email,
      password
    })
    res.render('/users/home');
  } catch {
    next(checkError);
  }
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
