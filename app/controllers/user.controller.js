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

const moment = require('moment')

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
                    console.log("New user register");

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

    console.log(req.body);
    
    User.find({ email: req.body.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No user data availble in this email'
            });
        }

        console.log("REQUEST -------------------------------------------");

        var _signuser_hashed_password = req.body.uPass
        var keepme = req.body.keepme
        var userBrowser = req.body.userBrowser
        console.log(userBrowser);


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

                var newSign_in_user = new SignInToken({ email: req.body.uEmail, token: token, createdAt: today, keepme: keepme , browser : userBrowser});
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
                        "profilepic": user[0].profilepic,
                        "keepme": keepme,
                        "type" : user[0].type,

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
                var newSign_in_user = new SignInToken({ email: req.body.uEmail, token: token, createdAt: today, keepme: keepme, browser:userBrowser });
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
                        "profilepic": user[0].profilepic,
                        "keepme": keepme,
                        "type" : user[0].type,

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
//======================================================================================================
//=================================== Get all user recored      ==============================================
//====================================================================================================== 

exports.getAllUsers = function (req, res, next) {
    User.find({}, function (err, result) {
        if (err) {
            console.log(err);

        } else {
            res.status(200).json(result);
        }
    })
}


//======================================================================================================
//===================================   Delete Account      ==============================================
//====================================================================================================== 
exports.deleteUser = function (req, res) {
    console.log("Delete -----------------------------------------------------------------------");
    
    console.log(req.body);
    let deleteUser = {
        "uEmail": req.body.uEmail,
        "uPass": req.body.uPass,
    };
    console.log(deleteUser);
    User.find({ email: deleteUser.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No user data availble in this email'
            });
        }
        var _signuser_hashed_password = deleteUser.uPass
        var _user_hashed_password = user[0].password
        var isAvalabel = _signuser_hashed_password.localeCompare(_user_hashed_password, { sensitivity: 'base' })
        if (isAvalabel == 0) {
            // var idValid = req.params.id.localeCompare(user[0]._id)
            idValid = 0;
            if (idValid == 0) {
                UtilObj.sentEmailforDeletedUsers(user[0].email)
                User.findByIdAndRemove(user[0]._id, function (err) {
                    if (err) return next(err);
                    res.status(200).json({
                        message: 'Sucessfully Deleted'
                    })
                })
            } else {
                return res.status(405).json({
                    message: 'Your user id not valid'
                })
            }
        }
        else if (isAvalabel == 1) {
            return res.status(403).json({
                message: 'Your Password is did not match  '
            })
        }
        else if (isAvalabel == -1) {
            return res.status(403).json({
                message: 'Your Password is did not match'
            })
        }
        else {
            return res.status(401).json({
                message: 'Your Password is did not match'
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
//===================================  Reset Password      ==============================================
//======================================================================================================

exports.resetPassword = function (req, res) {
    let resetPassword = {
        "uEmail": req.body.userEmail,
        "uPass": req.body.newHashedPass,
        "salt": req.body.newSalt,
        "_id": req.body.userId
    };
    console.log(resetPassword);

    if (resetPassword._id == null || resetPassword._id == undefined || resetPassword.uEmail == null || resetPassword.uEmail == undefined) {
        return res.status(401).json({
            message: 'No data'
        })
    } else {

        User.find({ email: resetPassword.uEmail }).exec().then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth Faild , No user data availble in this email'
                });
            } else if (user.length == 1) {
                if (resetPassword.uPass == null || resetPassword.uPass == undefined || resetPassword.salt == null || resetPassword.salt == undefined) {
                    return res.status(402).json({
                        message: 'Your Password is did not match'
                    })
                }
                User.update({ _id: resetPassword._id }, {
                    $set: {
                        "password": resetPassword.uPass,
                        "salt": resetPassword.salt
                    }
                }, function (err) {
                    if (err) return next(err);
                    res.status(200).json({
                        message: 'Reset Successfully'
                    })
                })
            }
            else {
                return res.status(401).json({
                    message: 'Your Password is did not match'
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        })
    }
}


//======================================================================================================
//===================================  Profile Pis     ==============================================
//======================================================================================================


exports.uploadImage = function (req, res, next) {

    console.log(req.body);

    let updateProfilePic = {
        "uId": req.body.uId,
        "uEmail": req.body.uEmail,
        "profilepic": req.file.path
    }
    // console.log(updateProfilePic);
    User.find({ email: updateProfilePic.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'No user find , No user data availble in this email'
            });
        } else if (user.length == 1) {
            if (updateProfilePic.uId == null || updateProfilePic.uId == undefined || updateProfilePic.profilepic == null || updateProfilePic.profilepic == null == undefined) {
                return res.status(402).json({
                    message: 'No images'
                })
            }
            User.update({ _id: updateProfilePic.uId }, {
                $set: {
                    "profilepic": updateProfilePic.profilepic,

                }
            }, function (err) {
                if (err) return next(err);
                res.status(200).json({
                    message: 'Image Added sucessfully'
                })
            })
        }
        else {
            return res.status(401).json({
                message: 'No user find'
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
//===================================  get spesic user details==========================================
//======================================================================================================

exports.getSpecifUser = function (req, res, next) {
    User.find({ email: req.body.uEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No user data availble in this email'
            });
        }
        if (user.length == 1) {
            return res.status(200).json(
                user[0]
            )
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })
}

//======================================================================================================
//===================================  change user name       =========================================
//======================================================================================================

exports.changeUsername = function (req, res) {
    console.log(req.body);
    let chnageusername = {
        "uEmail": req.body.uEmail,
        "fname": req.body.fname,
        "lname": req.body.lname,
    };
    if (chnageusername.uEmail == null || chnageusername.uEmail == undefined) {
        return res.status(401).json({
            message: 'No data'
        })
    } else {
        User.find({ email: chnageusername.uEmail }).exec().then(user => {
            if (user.length < 1) {
                return res.status(402).json({
                    message: 'Auth Faild , No user data availble in this email'
                });
            } else if (user.length == 1) {
                if (chnageusername.fname == null || chnageusername.fname == undefined || chnageusername.lname == null || chnageusername.lname == undefined) {
                    return res.status(402).json({
                        message: 'Please provide First name & Last name'
                    })
                }
                User.update({ email: chnageusername.uEmail }, {
                    $set: {
                        "fname": chnageusername.fname,
                        "lname": chnageusername.lname
                    }
                }, function (err) {
                    if (err) return next(err);
                    res.status(200).json({
                        message: 'Reset Successfully'
                    })
                })
            }
            else {
                return res.status(401).json({
                    message: 'Your Password is did not match'
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        })
    }
}

exports.getLastLogin = function (req, res, next) {
    var email = req.body.uEmail
    console.log(email);
    
    if (email != null || email != undefined) {
        SignInToken.find({ email: email }, function (err, docs) {
            try {
                return res.status(200).json({
                    lastlogin: moment(docs[0].createdAt).format('MMMM Do YYYY, h:mm:ss a'),
                    token: docs[0].token,
                    keepme: docs[0].keepme,
                    // userBrowser : doc[0].userBrowser
                })
                

            } catch (error) {
                return res.status(411).json({
                    message: 'No data found',
                    err:error
                });
            }
        }).sort([["email", 1], ["createdAt", "desc"]])
    } else {
        return res.status(201).json({
            lastlogin: 'Please provide email'
        })
    }
}
exports.getLastLoginForUser = function (req, res, next) {
    var email = req.body.uEmail
    console.log(email);
    
    if (email != null || email != undefined) {
        SignInToken.find({ email: email }, function (err, docs) {
            try {
                return res.status(200).json({

                    lastlogin: moment(docs[0].createdAt).format('MMMM Do YYYY, h:mm:ss a'),
                    browser: docs[0].browser,
                    keepme: docs[0].keepme,                    
                })
                

            } catch (error) {
                return res.status(411).json({
                    message: 'No data found',
                    err:error
                });
            }
        }).sort([["email", 1], ["createdAt", "desc"]])
    } else {
        return res.status(201).json({
            lastlogin: 'Please provide email'
        })
    }
}

