const express = require('express');
const router = express.Router();
const passport = require('passport');
router.use(express.static('public'));
const { ensureAuthenticated, isAdmin } = require('../config/auth');

var bodyParser = require('body-parser');
// parse various different custom JSON types as JSON
router.use(bodyParser.json({ type: 'application/json' }));

//Load User model
const User = require('../models/User');

//get for admin login
router.get(
  '/',
  (req, res) => res.render('admin')
  //console.log(req.user)
);

//post for admin login
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/admin/');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      //localStorage.setItem('user', JSON.stringify(user));
      //
      return res.redirect('/admin/dashboard');
    });
  })(req, res, next);
});

module.exports = router;
