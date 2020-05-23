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
//================================== Register     Manager  =============================================
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


//======================================================================================================
//================================== Login        Manager  =============================================
//======================================================================================================

exports.managerSignIn = function (req, res, next) {
    console.log(req.body);

    Manager.find({ email: req.body.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No user data availble in this email'
            });
        }

        console.log("REQUEST -------------------------------------------");

        var _signuser_hashed_password = req.body.uPass
        var keepme = req.body.keepme
        var userBrowser = req.body.userBrowser
        console.log(keepme);


        var _user_hashed_password = user[0].password
        var isAvalabel = _signuser_hashed_password.localeCompare(_user_hashed_password, { sensitivity: 'base' })

        console.log("Available User Password : ", _user_hashed_password);
        console.log("Comming User Password   : ", _signuser_hashed_password);
        console.log("is availabel ", isAvalabel);




        if (isAvalabel == 0) {

            if (keepme == true) {
                // -----------------------------------

                const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    attributes.env.JWT_KEY,
                    {
                        expiresIn: "240h"
                    }
                );
                var today = new Date()
                // store sign in token in userr data
                var newSign_in_user = new SignInToken({ email: req.body.uEmail, token: token, createdAt: today, keepme: keepme, browser: userBrowser });
                newSign_in_user.save(function (err) {
                    if (err) {
                        return next(err);
                    }

                })
                return res.status(200).json({
                    message: 'Auth Sucess',

                    userData: {
                        "id": user[0]._id,
                        "fname": user[0].fname,
                        "lname": user[0].lname,
                        "email": user[0].email,
                        "createdat": user[0].created_at,
                        "token": token,
                        "keepme": keepme,
                        "type": user[0].type
                    }

                })
                // -----------------------------------
            } else {
                // -----------------------------------

                const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    attributes.env.JWT_KEY,
                    {
                        expiresIn: "240h"
                    }
                );
                var today = new Date()
                // store sign in token in userr data
                // today   = moment(today).format('LLLL')
                var newSign_in_user = new SignInToken({ email: req.body.uEmail, token: token, createdAt: today, keepme: keepme, browser: userBrowser });
                newSign_in_user.save(function (err) {
                    if (err) {
                        return next(err);
                    }

                })
                return res.status(200).json({
                    message: 'Auth Sucess',
                    userData: {
                        "id": user[0]._id,
                        "fname": user[0].fname,
                        "lname": user[0].lname,
                        "email": user[0].email,
                        "createdat": user[0].created_at,
                        "token": token,
                        "keepme": keepme,
                        "type": user[0].type
                        // "lastloginDetails" : lastloginDetails
                    }
                })
                // -----------------------------------
            }

        }
        else if (isAvalabel == 1) {
            return res.status(403).json({
                message: 'Auth faild, passwod did not match'
            })
        }
        else if (isAvalabel == -1) {
            return res.status(403).json({
                message: 'Auth faild, passwod did not match'
            })
        }

        else {
            return res.status(401).json({
                message: 'Auth faild, passwod did not match'
            })
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })

}
//======================================================================================================
//================================== Get salt     Manager  =============================================
//======================================================================================================

exports.getSaltManager = function (req, res, next) {
    Manager.find({ email: req.body.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No user data availble in this email'
            });
        }
        var user__salt = user[0].salt
        if (user.length == 1) {
            return res.status(200).json({
                message: 'Auth success',
                _user_salt: user__salt
            })
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })
}