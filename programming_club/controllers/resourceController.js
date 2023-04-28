// export the model
const Resourcedb = require('../models/resource.js');
const User = require('../models/User.js');
const { createError } = require('../custom_error/error.js');

//get request

// get all request
module.exports.Resource_get_all = async (req, res, next) => {
  try {
    const resource = await Resourcedb.find();
    resource.sort((a, b) => {
      return new String(b.title).localeCompare(a.title);
    });
    if (req.isAuthenticated()) {
      const foundUser = await User.findById(req.user._id);
      if (foundUser) {
        res.render('../views/resource/resource_home.ejs', {
          userid: foundUser._id,
          backend_resources: resource,
          is_admin: foundUser.isadmin,
          is_member: foundUser.ismember,
        });
      } else{
        res.send('user is not authenticated. Please try again.');
      }
    }
  } catch (err) {
    res.send('There was an error in loading resource. Please try again.');
  }
};
