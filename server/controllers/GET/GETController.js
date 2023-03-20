// Description: This file contains all the functions that are used to render the pages and to handle the requests
// import the Schema all from the models folder
// const {logindb,signupdb} = require('../../../models/Schema.js');
// const loginSchema = require('../../models/Schema');
// const signupSchema = require('../../models/Schema');
//  require the Schema from the models folder
// const Schema = require('../models/Schema.js');






module.exports.home_page = async (req, res) => {
    // res.render('../views/homepage.ejs', { title: 'Home Page' });
    res.render('../views/homepage.ejs');
}

module.exports.signup_page = async (req, res) => {
    res.render('../views/login&signup.ejs', { title: 'Signup Page' });
}

module.exports.login_page = async (req, res) => {
    res.render('../views/login&signup.ejs', { title: 'Login Page' });
}


