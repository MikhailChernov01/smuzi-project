const router = require('express').Router();
// const error = require('../middleware/error');
const { checkSession, checkVerification, cookiesCleaner } = require('../middleware/check');
const note = require('../models/note');

router.get('/', (req, res) => {
  res.redirect('/users/home');
});

router
  .route('/home')
  .get((req, res) => {
    const { user } = req.session;
    if (req.session.user) {
      res.render('home')
    } else {
      // res.redirect('/login');
    }
  })


router
  .route('/logouts')
  .get(checkSession, async (req, res, next) => {
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
  });

router
  .route('/note')
  .get(async (req, res) => {
    const notes = await note.find({}).limit(15);
    console.log(notes);
    res.render('note', { notes });
  });
router
  .route('/note/new')
  .get((req, res) => {
    res.render('createnote')
  })

module.exports = router;
