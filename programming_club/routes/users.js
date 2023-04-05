const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

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

module.exports = router;
