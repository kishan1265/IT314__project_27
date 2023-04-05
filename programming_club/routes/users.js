const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

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
  
    
      });

 
module.exports = router;
