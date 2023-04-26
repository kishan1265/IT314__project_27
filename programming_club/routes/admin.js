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

router.get('/event_dashboard', isAdmin, (req, res) => {
  Event.find().then((data) => {
    //console.log(data);
    res.render('event_dashboard', {
      user: req.user,
      events: data,
    });
  });
});

// Add Admin
router.post('/add_admin', (req, res) => {
  //console.log(req.body);
  // res.send('hello');
  const { email } = req.body;
  let errors = [];

  //console.log(programe);
  //check required fields
  if (!email) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check email id of daiict
  if (
    email.substr(-13, 13) != '@daiict.ac.in' ||
    email[1] != '0' ||
    email[0] != '2' ||
    !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
    !(
      email[5] == '0' ||
      email[5] == '1' ||
      email[5] == '2' ||
      email[5] == '3'
    ) ||
    email[6] >= '6'
  ) {
    errors.push({ msg: 'Please Register using correct daiict Id' });
  }

  if (errors.length > 0) {
    res.render('add_admin', {
      errors,
    });
  } else {
    //res.send('pass');
    User.findOne({ email: email }).then((user) => {
      if (user) {
        try {
          change = async (req, res) => {
            await User.updateOne(
              {
                _id: user.id,
              },
              {
                $set: {
                  isadmin: true,
                  ismember: true,
                },
              }
            );
          };
          change();

          res.redirect('/admin/dashboard');
        } catch (error) {
          console.log(error);
          //res.send('Not verified');
          res.json({ status: 'Something went wrong' });
        }
      } else {
        errors.push({ msg: 'Email not exists' });
        res.render('add_admin', {
          errors,
        });
      }
    });
  }
});

module.exports = router;
