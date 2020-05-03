//import User model
const User = require('../models/user.model');
//import Sign model
const SignInToken = require('../models/signtokens.model');
//import Admin
const Admin = require('../models/admin.model');
//import Manger
const Manager = require('../models/manager.model');
// import util functions
const UtilObj = require('../util/util')
// import hash mwthod
const bcrypt = require('crypto-js')

// import jason web token
const jwt = require('jsonwebtoken')
// import nodemon
const attributes = require('../../nodemon.json')

// import middle ware
const checkAuth = require('../middleware/checkauth.middleware.js')

const moment = require('moment')


// test functions
exports.test = function (req, res) {

    console.log(req.body);



    res.status(200).json({
        message: 'You are admin'
    })

};



//======================================================================================================
//================================== Register Super Admin  =============================================
//====================================================================================================== 

exports.registerManager = function (req, res, next) { 

    var DePas  = req.body.DePas;
   let new_manager = Manager({
        fname: req.body.firstname,
        lname: req.body.lastname,
        email: req.body.useremail,
        password: req.body.password,
        salt: req.body.salt,
        adminId : req.body.adminId
    });
    // check all values 
    if ((new_manager.fname != null || new_manager.fname != undefined)
        && (new_manager.lname != null || new_manager.lname != undefined)
        && (new_manager.password != null || new_manager.password != undefined)
        && (new_manager.email != null || new_manager.email != undefined)
        && (new_manager.adminId != null || new_manager.adminId != undefined)
        && (new_manager.salt != null || new_manager.salt != undefined)) {

        console.log(new_manager);
        // check userdata
        Manager.find({ email: new_manager.email }, function (err, docs) {
            if (docs.length == 0) {
                //save 
                new_manager.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    console.log("New user register");
                    UtilObj.sentEmailforRegisterManagers(new_manager.email, DePas,new_manager.fname )
                    res.status(200).send('Added Successfully');
                })
            } else {
                res.status(403).send('Already have')
            }
        })


    } else {
        res.status(600).send('Not Added');
    }

}