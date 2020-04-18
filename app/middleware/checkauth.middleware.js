// check auth middle ware

// import jason web token
const jwt = require('jsonwebtoken')
// import nodemon

const attributes = require('../../nodemon.json')








//======================================================================================================
//===================================  User autanticazion         ==============================================
//====================================================================================================== 
module.exports = (req, res, next) => {
    try {
        const decorded = jwt.verify(req.body.token, attributes.env.JWT_KEY);
        req.userData = decorded
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Auth faild, in middle ware'
        });
    }
};