// Import necessary modules
const bcrypt = require('bcryptjs');
const Userdb  = require('../../../models/UserSchema.js');
const createError = require('../../../utils/error.js');

// Handler function for POST request to create a new user
module.exports.signup_POST = async (req, res,next) => {
    try {
        // Get user input from request body
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = await Userdb.create({
            username,
            email,
            password: hashedPassword,
        });

        // Send response
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        // Handle errors
        return next(err);
    }
};
