const jwt = require('jsonwebtoken');
const configs = require('../configs/auth.configs');
const db = require('../models');
const User = db.user;

const verifyToken = (req,res,next) => {

}

const isAdmin = (req,res,next) => {

}

const authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authjwt;