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

router.get('/event', ensureAuthenticated, function (req, res) {
  Event.find().then((data) => {
    //console.log(data);
    res.render('event.ejs', {
      user: req.user,
      practices: data,
    });
  });
  //console.log(req.user.name)
});

router.post('/event', function (req, res) {
  //console.log(req.body.event_id);
  const event_id = req.body.event_id;
  const user_id = req.body.user_id;

  Event.findOne({ _id: event_id }).then((event) => {
    if (event.participants.includes(user_id)) {
    } else {
      updatedEvent = async (req, res) => {
        await Event.findByIdAndUpdate(
          event_id,
          {
            $push: { participants: user_id },
          },
          {
            new: true,
          }
        );
      };
      updatedEvent();
    }
  });

  res.redirect('/event');
  //res.status(200).json({ status: 'success' });
  //alert('You have successfully registered for the event <%= event.name %>');
  //console.log(req.user.name);
});

router.get(
  '/feedback',
  ensureAuthenticated,
  (req, res) =>
    res.render('user_feedback', {
      user: req.user,
    })
  //console.log(req.user.name)
);

router.post('/feedback', function (req, res) {
  const { title, feedback } = req.body;
  const email = req.user.email;
  const name = req.user.name;

  //console.log(email, title, name, feedback);

  let errors = [];

  if (!title || !feedback) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('user_feedback', {
      errors,
      title,
      feedback,
    });
  } else {
    const newFeedback = new Feedback({
      title,
      email,
      name,
      feedback,
    });
    newFeedback.save().then((feedback) => {
      req.flash('success_msg', 'Your feedback has been submitted');
      res.redirect('/feedback');
    });
  }
});

module.exports = router;
