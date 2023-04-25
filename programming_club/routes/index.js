const express = require('express');
const router = express.Router();
//const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

//get edit_profile
router.get(
    '/edit_profile',
    ensureAuthenticated,
    (req, res) =>
      res.render('edit_profile.ejs', {
        user: req.user,
      })
    //console.log(req.user.name)
  );
  
module.exports = router;

