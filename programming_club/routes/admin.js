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

//get paticipate ID
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

//get for admin login
router.get(
  '/',
  (req, res) => res.render('admin')
  //console.log(req.user)
);
