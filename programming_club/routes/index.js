const express = require('express');
const router = express.Router();
router.use(express.static('public'));
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

router.get(
  '/dashboard',
  ensureAuthenticated,
  (req, res) =>
    res.render('dashboard', {
      user: req.user,
    })
  //console.log(req.user)
);

// res.render('dashboard', {
//   name: req.user.name,
// })
//);

//Profile
router.get(
  '/profile',
  ensureAuthenticated,
  (req, res) =>
    res.render('profile.ejs', {
      user: req.user,
    })
  //console.log(req.user.name)
);

module.exports = router;

module.exports = router;
