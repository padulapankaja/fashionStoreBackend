//import User model
const NewsLetter = require('../models/newsletters.model');

const UtilObj = require('../util/util')

const Admin = require('../models/admin.model');
const Manager = require('../models/manager.model');
const User = require('../models/user.model');

//======================================================================================================
//===================================  ADD SUBSCRIBE      ==============================================
//====================================================================================================== 
exports.subscribe = function (req, res, next) {
    console.log(req.body.email);
    
    let new_user = NewsLetter({
        email: req.body.email,
    });
    new_user.save(function (err) {
        if (err) {
            return next(err);
        }
        UtilObj.sentEmailforSuscribe(new_user.email)
        console.log("New user register");
        // UtilObj.sentEmailforRegisterUsers(new_user.email)
        res.status(200).send('Added Successfully');
    })


}


//======================================================================================================
//===================================  PASSWORD RESET     ==============================================
//====================================================================================================== 
exports.forgotPassword = function (req, res, next) {
    console.log(req.body.email);
    console.log(req.body.type);
    
    var email = req.body.email
    var type =  req.body.type

    if(type == "admin"){
        console.log("ADMIN");
        
    }else if(type == "user"){
        console.log("USER");
        
    }else if(type == "manager"){
        console.log("MANAGER");
        
    }else{
        console.log("Invalid");
        
    }

    
    return res.send(type)


}


