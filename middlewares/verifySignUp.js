const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

 const checkDuplicateNameOrEmail = (req,res,next) => {

    User.findOne({
        where:{
            username : req.body.username
        }
    })
    .then( user => {
        if(user){
            res.status(400).send({
                message : "username already exists please use another name"
            })
            return;
        }

        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(user => {
            if(user){
                res.status(400).send({
                    message : "email already exists please use another email"
                })
                return;
            }
        })
        next();
    })

}

const checkRolesExisted = (req, res,next) => {
    if(req.body.roles){
        for(let i = 0; i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message :" role does not exist "+req.body.roles[i]
                })
                return;
            }
        }
    }
    next();
}
const verifySignUp = {
    checkDuplicateNameOrEmail : checkDuplicateNameOrEmail,
    checkRolesExisted : checkRolesExisted
}

module.exports = verifySignUp 

