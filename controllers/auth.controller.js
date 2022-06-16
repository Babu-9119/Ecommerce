const db = require('../models');
const config = require('../configs/auth.configs')
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signUp = (req, res) => {
    User.create({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    })
    .then(user => {
        console.log("user created");
        if(req.body.roles){
            Role.findAll({
                where : {
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles)
                .then( () => {
                    res.send({
                        message :'user registered successfully'
                    })
                })
            })
        }else{
            user.setRoles([1])
            .then( () => {
                res.send({message : "user registered successfully"})
            })
        }
    })
    .catch( err => {
        res.status(500).send({message: err.message});
    })


}

exports.signIn = (req, res) => {
    User.findOne({
        where : {
            username : req.body.username
        }
    })
    .then( user => {
        if(!user){
            return res.status(404).send({message : "user not found please signUp"})
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

        if(!passwordIsValid){
            res.status(401).send({
                message:"invalid password"
            })
        }

        var token = jwt.sign({id : user.id}, config.secret, {
            expiresIn : 86400 //24 hours
        });

        res.send({
            id : user.id,
            username : user.username,
            email : user.email,
            accesstoken : token
        })
    }) 
    .catch(err => {
        res.status(500).send({
            message : err.message
        })
    })

}