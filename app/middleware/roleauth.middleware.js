const jwt = require('jsonwebtoken')
// import nodemon

const attributes = require('../../nodemon.json')

const checkRole = type => (req, res, next) =>
  !type.includes(req.body.type)
    ? res.status(401).json({message : "Unauthorized"})
    : next();

module.exports = {
    checkRole,
};
