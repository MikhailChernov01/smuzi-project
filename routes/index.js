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

router.get('/promocode', (req, res) => {
  res.render('promocode')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/super', (req, res) => {
  res.render('superUser')
})

// router.get('/users/home', (req, res) => {
//   res.render('home')
// })

router.post('/super', async (req, res) => {

  let {
    email,
    password
  } = req.body

  let user = await User.findOne({
    email: email,
    password: password,
  })
  if (user == null && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect('/login')
  } else {
    if (user.superUser == true) {
      res.render('superUser')
    } else {
      res.redirect('/users/home')
    }
  }
});


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
    res.redirect('/promocode')
    // res.render('promocode')
  }
})
router.post('/register/create', async (req, res) => {
 
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, saltRounds),
    });
    await user.save();
    req.session.user = user;
    console.log(user);
  } catch {
    next(error);
  }
  res.redirect('/users')
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
