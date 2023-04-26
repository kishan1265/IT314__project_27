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
 
//get participate id
router.get('/participate/:id', async function (req, res) {
  const event_id = req.params.id;

  //console.log(event_id);

  const data = await Event.find({ _id: event_id }).populate('participants');
  //console.log(data);
  res.render('participate', {
    event_name: data[0].name,
    participants: data[0].participants,
    user_name: req.user.name,
  });
});

//post delete_event
router.post('/delete_event', (req, res) => {
  // delete event in database
  //console.log(req.body);
  const { event_id } = req.body;
  //console.log(event_id);
  Event.deleteOne({ _id: event_id }).then((data) => {
    //console.log(data);
    res.redirect('/admin/event_dashboard');
  });
});


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
