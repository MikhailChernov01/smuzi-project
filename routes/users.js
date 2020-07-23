const router = require('express').Router()
// const error = require('../middleware/error');
// const {checkSession, checkVerification, cookiesCleaner} = require('../middleware/check')

router.get('/', (req, res)=>{
  res.redirect('/users/home');
})

router
  .route('/home')
  .get((req,res)=>{
    res.render('home', { user:'Ivan' })
  })

router
  .route('/logouts')
  .get(async (req, res, next) => {
    if (req.session.user) {
      try {
        await req.session.destroy();
        res.clearCookie("user_sid");
        res.redirect("/");
      } catch (error) {
        next(error);
      }
    } else {
      res.redirect("/users/login");
    }
  })

module.exports = router
