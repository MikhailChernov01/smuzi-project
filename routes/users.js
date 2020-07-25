/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
// const error = require('../middleware/error');
const { checkSession, checkVerification, cookiesCleaner } = require('../middleware/check');
const Note = require('../models/note');
const User = require('../models/users');

router.get('/', (req, res) => {
  res.redirect('/users/home');
});

router
  .route('/home')
  .get(checkSession, (req, res) => {
    const { user } = req.session;
    if (req.session.user) {
      res.render('home');
    } else {
      // res.redirect('/login');
    }
  });

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
    const notes = await Note.find({}).limit(15);
    res.render('note', { notes });
  });

router
  .route('/note/new')
  .get((req, res) => {
    res.render('createnote');
  });

router
  .route('/bottle')
  .post(checkSession, async (req, res) => {
    const { user } = req.session;
    const goods = req.body;
    await User.updateOne({ _id: user._id }, { $push: { purchases: goods.inputNewCode } });
    res.redirect('/users/home');
  });

router
  .route('/note/:id')
  .get(async (req, res) => {
    let note = await Note.findById(req.params.id)
    // console.log(autor);
    let test = req.session.user._id
    console.log(test);
    let newNote = await Note.findByIdAndUpdate({_id:req.params.id},{author: test}, {new: true});
    // console.log(test);
    // note.title = test;
    // console.log(note);

    // req.session.user._id
    // try {
    //   if((!note.author===undefined)&&(String(note.author)===String(user._id))) {

    //     console.log(user._id);
    //     console.log(note);
    //   }
    // } catch (error) {
    //   next(error)
    // }

  });




module.exports = router;
