function checkSession(req,res,next) {
  if(!!req.session.user) {
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
function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}




module.exports = {
  checkSession,
  checkVerification,
  cookiesCleaner
}

