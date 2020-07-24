const router = require('express').Router()
// const error = require('../middleware/error');
const {checkSession, checkVerification, cookiesCleaner} = require('../middleware/check')

router.get('/', (req, res)=>{
  res.redirect('/users/home');
})

router
  .route('/home')
  .get((req,res)=>{
    const user = req.session.user
    console.log(user);
    res.render('home',{user})
  })
  // .get((req,res)=>{
  //   const {user} = req.session
  //   if (!req.session.user) {
  //     res.render('home', { user: user.username })
      
  //   } else {
  //     res.redirect('/login');
  //   }
  // })

router
  .route('/logouts')
  .get(checkSession,async (req, res, next) => {
    if (req.session.user) {
      try {
        await req.session.destroy();
        res.clearCookie('user_sid');
        res.redirect('/');
      } catch (error) {
        next(error);
      }
    } else {
      res.redirect('/');
    }
  })

  router
    .route('/note')
    .get((req,res)=> {
      res.render('note')
    })

module.exports = router
