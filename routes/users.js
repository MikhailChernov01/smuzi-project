/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
// const error = require('../middleware/error');
const { checkSession, checkVerification, cookiesCleaner } = require('../middleware/check');
const Note = require('../models/note');
const User = require('../models/users');

router.get('/', checkSession, (req, res) => {
  res.redirect('/users/home');
});

router
  .route('/home')
  .get(checkSession, async (req, res) => {
    const { user } = req.session;
    // const userInHbs = await User.findOne({_id: user._id})
    // console.log(userInHbs);
    if (req.session.user) {
      res.render('home', { user });
    } else {
      res.redirect('/login');
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
  .get(checkSession, async (req, res) => {
    const notes = await Note.find({}).limit(15);
    res.render('note', { notes });
  });

router
  .route('/note/new')
  .get(checkSession, (req, res) => {
    res.render('createnote');
  });

router
  .route('/bottle')
  .post(checkSession, async (req, res) => {
    const { user } = req.session;
    const { inputNewCode } = await req.body;
    const newUser = await User.findOneAndUpdate({ _id: user._id }, { $push: { purchases: inputNewCode } });
    res.json({ newUser })
    // res.redirect('/users/home');
  });

router
  .route('/note/:id')
  .get(checkSession, async (req, res) => {
    const { user } = req.session
    //add author
    // let newNote = await Note.findByIdAndUpdate({ _id: req.params.id }, { author: req.session.user._id }, { new: true });
    let note = await Note.findById({ _id: req.params.id });
    try {
      if ((String(note.author) === String(user._id))) {
        await Note.findOneAndDelete({ _id: req.params.id })
        res.redirect('/users/note')
      }
    } catch (error) {
      next(error)
    }
  })
  .put(checkSession, async (req, res, next) => {
    const { user } = req.session;
    const note = await Note.findById(req.params.id);

    note.title = req.body.title;
    note.text = req.body.text;
    await note.save();

    res.redirect(`/note`);
  })

router
  .route('/note/:id/edit')
  .get(checkSession, async (req, res) => {
    const note = await Note.findById(req.params.id);
    const { user } = req.session;
    // let newNote = await Note.findByIdAndUpdate({ _id: req.params.id }, { author: user._id }, { new: true });
    try {
      if ((String(note.author) === String(user._id))) {
        res.render('edit', { note });
      }
    } catch (error) {
      next(error)
    }
  });




module.exports = router;
