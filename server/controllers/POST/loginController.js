const signupdb = require('../../../models/UserSchema.js');




// error middleware
// const createError = require('../../../utils/error.js');

module.exports.login_POST = async (req, res) => {
    const { email, password } = req.body;

    try {
        const login_detalis = await signupdb.findOne({ email: email });
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
        return res.redirect('/login');
    }
}
