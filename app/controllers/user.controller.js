//import User model
const User = require('../models/user.model');
// import util functions

const UtilObj = require('../util/util')

// test functions
exports.test = function (req, res) {
    res.json({ val: 'Greetings from the Test controller!', des: '1424', kk: '45455' });
};


// add user 

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