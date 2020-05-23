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

exports.registerSuperAdmin = function (req, res, next) {
    let new_admin = Admin({
        fname: req.body.firstname,
        lname: req.body.lastname,
        email: req.body.useremail,
        password: req.body.password,
        salt: req.body.salt,
    });
    // check all values 
    if ((new_admin.fname != null || new_admin.fname != undefined)
        && (new_admin.lname != null || new_admin.lname != undefined)
        && (new_admin.password != null || new_admin.password != undefined)
        && (new_admin.email != null || new_admin.email != undefined)
        && (new_admin.salt != null || new_admin.salt != undefined)) {
        console.log(new_admin);
        // check userdata
        Admin.find({ email: new_admin.email }, function (err, docs) {
            if (docs.length == 0) {
                //save 
                new_admin.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    console.log("New user register");

                    UtilObj.sentEmailforRegisterUsers(new_admin.email)
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
//================================== Sign Super Admin  =============================================
//====================================================================================================== 
exports.signInAdmin = function (req, res, next) {

    console.log(req.body);

    Admin.find({ email: req.body.uEmail }).exec().then(user => {
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
//===================================  Get Salt             ==============================================
//====================================================================================================== 

exports.getSalt = function (req, res, next) {
    Admin.find({ email: req.body.uEmail }).exec().then(user => {
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
//===================================  Get All Managers  ==============================================
//====================================================================================================== 

exports.getAllManagers = function (req, res, next) {
    Manager.find(null, { "_id": true, "fname": true, "lname": true, "email": true, "adminId": true, "created_at": true }).exec().then(user => {
        if (user.length < 1) {
            return res.status(402).json({
                message: ' No manager data availble in this email'
            });
        } else {
            return res.status(200).json({
                managers: user
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
//===================================  Get All Users     ==============================================
//====================================================================================================== 

exports.getAllUsers = function (req, res, next) {
    User.find(null, { "_id": true, "fname": true, "lname": true, "email": true, "profilepic": true, "created_at": true }).exec().then(user => {
        if (user.length < 1) {
            return res.status(402).json({
                message: ' No User data availble in this email'
            });
        } else {
            return res.status(200).json({
                users: user
            });
        }


    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })



}


exports.getUsersBrowserDetails = function (req, res, next) {
    SignInToken.find(null, { "_id": false, "browser": true }).exec().then(logins => {
        if (logins.length < 1) {
            return res.status(402).json({
                message: ' No login data found'
            });
        } else {
            return res.status(200).json({
                browsers: logins
            });
        }


    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })

}
exports.getUsersLoginTimeDetails = function (req, res, next) {
    SignInToken.find(null, { "_id": false, "createdAt": true }).exec().then(logins => {
        if (logins.length < 1) {
            return res.status(402).json({
                message: ' No login data found'
            });
        } else {
            return res.status(200).json({
                lastlogins: logins
            });
        }


    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })

}

exports.userStat = async function (req, res, next) {
    // get user login browser
    var Chrome = await SignInToken.countDocuments({ "browser": "Chrome" })
    var IExplorer = await SignInToken.countDocuments({ "browser": "IExplorer" })
    var Safari = await SignInToken.countDocuments({ "browser": "Safari" })
    var Opera = await SignInToken.countDocuments({ "browser": "Opera" })
    var Firefox = await SignInToken.countDocuments({ "browser": "Firefox" })

    // // get new user in current year
    var userCountsInYearly = []
    for (i = 0; i <= 3; i++) {
        var ss;
        var currentYear = new Date().getFullYear() - i
        ss = await User.countDocuments({ 'created_at': { '$regex': currentYear } })
        userCountsInYearly[i] = {
            year: currentYear,
            usersCount: ss
        }
    }



    var senDetails = {
        "browser": {
            "Chrome": Chrome,
            "IExplorer": IExplorer,
            "Safari": Safari,
            "Opera": Opera,
            "Firefox": Firefox
        },
        userInYear: userCountsInYearly
    }




    console.log("User Browser Details -------------------------");


    console.log(senDetails);

    console.log("User Browser Details -------------------------");
    return res.status(200).json({
        senDetails
    });


}


exports.getUserRegistrationMonths = async function (req, res, next) {
    var userCountsInYearly = [null];
    var usercountinmo;
    var currentYear = new Date().getFullYear()
    for (i = 1; i <= 12; i++) {
        if (i < 10) {
            var searchDate = currentYear + "-0" + i;
            console.log(searchDate)
            usercountinmo = await SignInToken.countDocuments({
                'createdAt': {
                    $gte: searchDate + '-01 00:00:00',
                    $lt: searchDate + '-31 23:59:59'
                }
            })
        } else {
            console.log(searchDate)
            var searchDate = currentYear + "-" + i;
            usercountinmo = await SignInToken.countDocuments({
                'createdAt': {
                    $gte: searchDate + '-01 00:00:00',
                    $lt: searchDate + '-31 23:59:59'
                }
            })
        }
        userCountsInYearly[i - 1] = {
            year: currentYear,
            month: i,
            usersCount: usercountinmo
        }

    }
    console.log(userCountsInYearly)
    return res.status(200).json({
        monthBasedUser: userCountsInYearly
    });


}



//======================================================================================================
//===================================  Delete Managers     ==============================================
//====================================================================================================== 
exports.removeManagers = function (req, res, next) {
    Manager.find({ email: req.body.managerEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Faild , No Manager data availble in this email'
            });
        }
        UtilObj.sentEmailforDeletedUsers(user[0].email)
        Manager.findByIdAndRemove(user[0]._id, function (err) {
            if (err) return next(err);
            res.status(200).json({
                message: 'Sucessfully Deleted'
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })
}



//======================================================================================================
//=================================== check registation     ==============================================
//====================================================================================================== 

exports.getuserbyMonth = function(req, res, next) {
   
    var currentMonth = new Date(moment( new Date() ).format("YYYY-MM-DD") ); 
    var prev =  new Date()

    prev.setMonth(prev.getMonth() - 6)
    currentMonth.setMonth(currentMonth.getMonth() + 1)
    
    console.log(currentMonth);
    console.log(prev);
    
    let data_labels = []
    let data_values = []
    
    SignInToken.aggregate([
        {
            $project: {
                //   xx : { $toString : "$token" },
                create : { $dateToString: { format: "%Y-%m", date: "$createdAt" } }
            }
        },
        {
            $group : { _id : "$create"  , total: { $sum: 1 }  }
        }
    ]).exec(function(err, result) {
        if (err) { return next(err)}
        

        for(var arr=[],dt= prev ; dt<= currentMonth; dt.setMonth(dt.getMonth()+1)){ 
            
            let c = new Date(dt);
            let total = 0;
            let find = result.findIndex( item => item._id == moment(new Date(c)).format("YYYY-MM") )
            if(find >= 0 ){
                total = result[find].total;
            }

            data_labels.push(moment(new Date(c)).format("YYYY-MM") );
            data_values.push(total);
          }
        
          data = {
            status : 'success',
            code : 200,
            data : { data_labels : data_labels , data_values : data_values },
        }
        res.json(data)
    });
}



//======================================================================================================
//=================================== check bowser     ==============================================
//====================================================================================================== 

exports.newBrowserDetails = function(req, res, next){
    let data_browser = []
    let data_brow_value = []
    SignInToken.aggregate([
        {
            $project: {
                //   xx : { $toString : "$token" },
                // create : { $dateToString: { format: "%Y-%m", date: "$createdAt" } }
                brow :{ $toString : "$browser"}
            }
        },
        {
            $group : { _id : "$brow"  , total: { $sum: 1 }  }
        }
    ]).exec(function(err, result) {
        if (err) { return next(err)}
        

        for(var i = 0 ; i< result.length; i++){ 
            if(result[i]._id != null || result[i]._id != undefined ){

                data_browser.push(result[i]._id);
                data_brow_value.push(result[i].total);
            }
          }
        
          data = {
            status : 'success',
            code : 200,
            data : { data_browsers : data_browser , data_brow_values : data_brow_value },
        }
        res.json(data)
    }); 
}


exports.getUserByYear = function(req, res, next){

    let data_year = []
    let data_count = []
    User.aggregate([
        {
            $project: {
                //   xx : { $toString : "$token" },
                create : { $dateToString: { format: "%Y-%m", date: "$created_at" } }
            }
        },
        {
            $group : { _id : "$create"  , total: { $sum: 1 }  }
        }
    ]).exec(function(err, result) {
        if (err) { return next(err)}
        

        for(var i = 0 ; i< result.length; i++){ 
            if(result[i]._id != null || result[i]._id != undefined ){

                data_browser.push(result[i]._id);
                data_brow_value.push(result[i].total);
            }
          }
        
          data = {
            status : 'success',
            code : 200,
            data : { data_browsers : data_browser , data_brow_values : data_brow_value },
        }
        res.json(data)
    }); 

}