const jwt = require('jsonwebtoken');
const configs = require('../configs/auth.configs');
const db = require('../models');
const User = db.user;

const verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'];
    //to check the token  provided by the user or not
    if(!token){
        return res.status(403).send({
            message:"no token provided please provide token"
        })
    }
    // to verify the token provided by the user is valid or not

    jwt.verify(token,configs.secret,(err,decoded) =>{
        if(err){
            return res.status(401).send({
                message:"unauthorized"
            })
        }
        req.userid = decoded.id
        next();
    })


}

const isAdmin = (req,res,next) => {
    User.findByPk(req.userid)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for(let i = 0; i< roles.length;i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"required admin access"
            })
            return;
        })
    })

}

const authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authjwt;