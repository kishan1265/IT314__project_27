const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
router.use(express.static('public'));

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

//Load User model
const User = require('../models/User');
// const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

router.get(`/reset/:id/:token`, (req, res) => {
  const { id, token } = req.params;
  //console.log(req.params);
  User.findOne({ _id: id }).then((user) => {
    if (!user) {
      errors.push({ msg: 'User not exists' });
      res.render('forget', {
        errors,
        email,
      });
    }
    const secret = JWT_SECRET + user.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render('reset', { email: verify.email });
    } catch (error) {
      res.send('Not verified');
    }
  });
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Register
router.post('/register', (req, res) => {
  
    //console.log(req.body);
    // res.send('hello');
    const { name, email, programe, batch, password, password2 } = req.body;
    let errors = [];
  
    //console.log(programe);
    //check required fields
    if (
      !name ||
      !email ||
      !password ||
      !password2 ||
      programe == '0' ||
      batch == '0'
    ) {
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
    if (password != password2) {
      //check passwords match
      errors.push({ msg: 'Passwords do not match' });
    }
  
    //check passwords match
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        programe,
        batch,
        password,
        password2,
      });
    } else {
      //res.send('pass');
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            programe,
            batch,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            programe,
            batch,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch((err) => console.log(err));
            });
          });
          // console.log(newUser);
          // res.send('hello');
        }
      });
    }
    
});

    //forgot password

router.post('/forgot', (req, res) => {
    //console.log(req.body);
    // res.send('hello');
    const email = req.body.email;
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
        res.render('forgot', {
          errors,
          email,
        });
      } else {
        //res.send('pass');
        User.findOne({ email: email }).then((user) => {
          if (user) {
            try {
              const secret = JWT_SECRET + user.password;
              const token = jwt.sign({ email: user.email, id: user._id }, secret, {
                expiresIn: '5m',
              });
              const link = `http://localhost:5000/users/reset/${user._id}/${token}`;
              res.render('emailverify', { email: user.email });
        } catch (error) {}
      } else {
        errors.push({ msg: 'Email not exists' });
        res.render('forgot', {
          errors,
          email,
        });
    }
    });
  }
           
});

module.exports = router;
