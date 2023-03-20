const mongoose=require('mongoose');

const loginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlenght:5,
    }

    // // password length should be 8 characters long
    // // password should contain at least one uppercase letter
    // // password should contain at least one lowercase letter
    // // password should contain at least one number
    // // password should contain at least one special character

    // password:{
    //     type:String,
    //     required:true,
    //     minlength:8,
    //     maxlength:20,
    //     validate(value){
    //         if(value.toLowerCase().includes('password')){
    //             throw new Error('Password cannot contain "password"');
    //         }
    //     }
    // }

});

const logindb= mongoose.model('loginSchema',loginSchema);

module.exports=
{
   logindb
}