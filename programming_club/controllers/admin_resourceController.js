// export the model
const resourcedb = require('../models/resource.js');
// const Categorydb = require('../models/Category.js');
const User = require('../models/User.js');
const { createError } = require('../custom_error/error.js');

module.exports.Resource_get_all = async (req, res, next) => {
  try {
    const resources = await resourcedb.find();
    resources.sort((a, b) => {
      return String(b.title).localeCompare(a.title);
    });
    if (req.isAuthenticated() && req.user.isadmin) {
      const foundUser = await User.findById(req.user.id);
      if (foundUser) {
        // res.render("../views/resource/resource_home", {
        //   newPost: resources,
        //   authenticated: req.isAuthenticated(),
        //   userLikedPosts: foundUser.likedPosts,
        // });
        res.render('../views/resource/admin_resource_home.ejs', {
          userid: foundUser._id,
          backend_resources: resources,
          is_admin: foundUser.isadmin,
          is_member: foundUser.ismember,
          //authenticated: req.isAuthenticated(),
          userLikedPosts: foundUser.likedPosts,
        });
      } else {
        res.send('user is not authenticated. Please try again.');
      }
    }
  } catch (error) {
    res.send('There was an error in loading resource. Please try again.');
  }
};

// get compose
module.exports.compose_get = async (req, res, next) => {
  res.render('../views/resource/compose', {
    // async: true,
    adminId: req.user.id,
  });
};

// post compose
module.exports.compose_post = async (req, res, next) => {
  let errors = [];
  const { title, description,link } = req.body;
  if (!title) {
    errors.push({ msg: 'Please enter the title' });
  }
  if (!link) {
    errors.push({ msg: 'Please enter the link' });
  }
  try {
    if(errors.length>0){
      res.render('../views/resource/compose', {
        errors,
        title,
        description,
        link,
      });
    } else {
      const newResource = new resourcedb({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
      });
      const savedResource = await newResource.save();
      if (savedResource) {
        req.flash('success_msg', 'Resource added successfully');
        res.redirect('/admin/resource');
      }
    }
  } catch (error) {
    res.send('There was an error in saving your resource. Please try again.');
    console.log(error);
  }
};

//update the resource
module.exports.compose_update_get = async (req, res, next) => {
  try {
    const foundResource = await resourcedb.findById(req.params.id);
    if (foundResource) {
      res.render('../views/resource/update_compose', {
        // async: true,
        adminId: req.params.id,
        title: foundResource.title,
        // markdown:foundResource.markdown,
        description: foundResource.description,
        link: foundResource.link,
      });
    }
  } catch (error) {
    res.send('There was an error. Please try again.');
  }
};
module.exports.compose_update = async (req, res, next) => {
  try {
    // const {title,markdown,description}=req.body;
    const updatedResource = await resourcedb.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          link: req.body.link,
        },
      },
      { new: true }
    );
    if (updatedResource) {
      req.flash('success_msg', 'Resource updated successfully');
      res.redirect('/admin/resource');
    }
  } catch (error) {
    res.send('There was an error in updating the Resource. Please try again.');
  }
};

// delete the resource
module.exports.compose_delete = async (req, res, next) => {
  const id = req.body.resource_id;
  try {
    const foundResource = await resourcedb.deleteOne({ _id: id });
    if (foundResource) {
      req.flash('success_msg', 'Resource deleted successfully');
      res.redirect('/admin/resource');
    }
  } catch (error) {
    res.send('There was an error in deleting the Resource. Please try again.');
  }
};
