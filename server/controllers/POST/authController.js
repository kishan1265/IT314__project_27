const bcrypt = require('bcryptjs');
const Userdb  = require('../../../models/UserSchema.js');
const {createError} = require('../../../utils/error.js');

module.exports.register = async (req, res,next) => {
    try {
        // Get user input from request body
        const { username, email, password } = req.body;

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

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

module.exports.login = async (req, res,next) => {
    try {
        const { username,email, password } = req.body;

        // find username or email in Userdb
        const userExists=await Userdb.findOne({$or:[{username:username},{email:email}]});
        if(!userExists){
            return next(createError(400,"User not found"));
        }
        const isPasswordCorrect=await bcrypt.compare(
            password,
            userExists.password
        );
        if(!isPasswordCorrect){
            return next(createError(400,"Invalid password or username"));
        }

        // Send response
        res.status(201).json({ message: "User logged in successfully", user: userExists });
    } catch (err) {
        // Handle errors
        return next(err);
    }
};
