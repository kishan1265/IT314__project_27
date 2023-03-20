// Description: This file contains all the functions that are used to render the pages and to handle the requests
// import the Schema all from the models folder
const {logindb,signupdb} = require('../../models/Schema.js');
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
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // try {
    //     const login_detalis=await Schema.create({name:name ,email:email,password:password});
    // } catch (error) {
    //     console.log(error);
    // }
    // take name, email and password from req.body
    // check if email already exists
    // if yes, then redirect to signup page
    // if no, then create a new user and redirect to home page

    // take a Schema from Schema.js for signup
    // create a new user
    // save the user
    // redirect to home page

    // check if email already exists
    // if yes, then redirect to signup page
    // if no, then create a new user and redirect to home page
    try {
        // useExists=0;
        const useExists = await signupdb.findOne({ email: email });
        if (useExists) {
            console.log('User Already Exists');
            return res.redirect('/login');
            
        }
        else {
            const signup_details = await signupdb.create({ name: name, email: email, password: password });
            console.log(signup_details);
            if (signup_details) {
                // res.redirect('/login');
                //go to the login_page
                console.log('User Created');
                return res.redirect('/login');
                
                
            }
            else {
                console.log('User Not Created');
                return res.redirect('/signup');
                
            }
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/signup');
    }


}

module.exports.login_page = async (req, res) => {
    res.render('../views/login&signup.ejs', { title: 'Login Page' });
    const { email, password } = req.body;
    console.log(email, password);
    // try {
    //     const login_detalis=await Schema.create({email:email,password:password});
    // } catch (error) {
    //     console.log(error);
    // }

    // take email and password from req.body
    // check if email and password are correct
    // if yes, then redirect to home page
    // if no, then redirect to login page
    try {
        const login_detalis = await logindb.findOne({ email: email });
        console.log(login_detalis);
        if (login_detalis) {
            if (login_detalis.password == password) {
                console.log('login successfull');
                return res.redirect('/');
                
            }
            else {
                console.log('Wrong Password');
                return res.redirect('/login');
                
            }
        }
        else {
            console.log('User Does Not Exists');
            return res.redirect('/login');
            
        }
    } catch (error) {
        console.log(error);
    }


}


