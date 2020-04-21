//import User model
const User = require('../models/user.model');
//import Sign model
const SignInToken = require('../models/signtokens.model');
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

// test functions
exports.test = function (req, res) {
    res.json({ val: 'Greetings from the Test controller!', des: '1424', kk: '45455' });
};



//======================================================================================================
//===================================  ADD USER         ==============================================
//====================================================================================================== 
exports.registerUser = function (req, res, next) {
    // create user  type object
    // console.log(req);

    let new_user = User({
        fname: req.body.firstname,
        lname: req.body.lastname,
        email: req.body.useremail,
        password: req.body.password,
        salt: req.body.salt,
        created_at: req.body.created_at,
    });
    // check all values 
    if ((new_user.fname != null || new_user.fname != undefined)
        && (new_user.lname != null || new_user.lname != undefined)
        && (new_user.password != null || new_user.password != undefined)
        && (new_user.email != null || new_user.email != undefined)
        && (new_user.created_at != null || new_user.created_at != undefined)
        && (new_user.salt != null || new_user.salt != undefined)) {
        console.log(new_user);


        // check userdata
        User.find({ email: new_user.email }, function (err, docs) {
            if (docs.length == 0) {
                //save 
                new_user.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    UtilObj.sentEmailforRegisterUsers(new_user.email)
                    res.status(201).send('Added Successfully');
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
//===================================  Login             ==============================================
//====================================================================================================== 

exports.signIn = function (req, res, next) {
    User.find({ email: req.body.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No user data availble in this email'
            });
        }
        console.log("REQUEST -------------------------------------------");
        console.log("REQUEST -------------------------------------------");
        console.log("REQUEST -------------------------------------------");
        console.log("REQUEST -------------------------------------------");
        console.log("REQUEST -------------------------------------------");

        var _signuser_hashed_password = req.body.uPass
        var keepMeSignIn = true;
        var _user_hashed_password = user[0].password
        var isAvalabel = _signuser_hashed_password.localeCompare(_user_hashed_password, { sensitivity: 'base' })

        console.log("Available User Password : ", _user_hashed_password);
        console.log("Comming User Password   : ", _signuser_hashed_password);
        console.log("is availabel ", isAvalabel);




        if (isAvalabel == 0) {
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            },
                attributes.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            var today = new Date();
            // store sign in token in userr data 

            var newSign_in_user = new SignInToken({ email: req.body.uEmail, token: token, createAt: today});

          
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
                }

            })

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
//===================================  Get Salt             ==============================================
//====================================================================================================== 

exports.getSalt = function (req, res, next) {
    User.find({ email: req.body.uEmail }).exec().then(user => {
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


//======================================================================================================
//=================================== Get Last record      ==============================================
//====================================================================================================== 

exports.getLatest = function (req, res, next) {
    SignInToken.find({ email: req.body.uEmail }).sort({ _id: -1 }).exec().then(userSignin => {
        console.log(userSignin);

        if (userSignin.length < 1) {
            res.status(201).json({
                error: "User no login in now"
            });

        } else {
            res.status(200).json({
                userSignin: userSignin[0]
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })
}
