const express = require('express');
const router = express.Router();
const GETController=require('../controllers/GET/GETController.js');
router.get('/',GETController.home_page);


// get routes
// router.get('/login',GETController.login_page);
// router.get('/register',GETController.signup_page);



// post routes
const authController = require('../controllers/POST/authController.js');
router.post('/register',authController.register);
router.post('/login',authController.login);



// put routes




// delete routes





module.exports=router;   // to privent this error "throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))" using this line 
