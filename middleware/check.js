function checkSession(req,res,next) {
  if(req.session.user) {
    res.redirect('/users/home');
  } else {
    next();
  }
}

function checkVerification(req, res, next) {
  if (req.session.user) {
    app.locals.user = req.session.user;
  }
  next()
}


let cookiesCleaner = 1;

module.exports = {
  checkSession,
  checkVerification,
  cookiesCleaner
}

