// export the model
const Resourcedb = require('../models/resource.js');
const Categorydb = require('../models/Category.js');
const {createError}=require('../custom_error/error.js');


//get request


// get all request
module.exports.Resource_get_all=async(req,res,next)=>{
    try{
        const resource=await Resourcedb.find();
        if(!resource){
            return next(createError(400,'Resource not found'));
        }
        res.status(200).json({
            status:'success',
            data:resource
        });
    }catch(err){
        next(err);
    }
}


//post request



//put request
// delete request
