const db = require('../models');
const Category = db.category;
const Product = db.product;

const validateCategoryRequest = (req,res,next) => {
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category should nor be empty !"
        })
        return;
    }
    next();
}

const validateProductRequest = (req,res,next) =>{
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the product should not be empty!"
        })
        return;
    }
    if(!req.body.cost){
        res.status(400).send({
            message:"Cost should not be empty please provide cost details"
        })
    }

    if(req.body.categoryId){
        Category.findByPk(req.body.categoryId)
        .then(category => {
            if(!category){
                res.status(400).send({
                    message:"categoryId passed ia not present"
                })
                return;
            }
           next();
        })
        .catch(err => {
            res.status(500).send({
                message:"some internal error occured while posting the product details"
            })
        })
    }else{
        res.status(400).send({
            message:"categoryId nor passed"
        })
        return;
    }
}

module.exports = {
    validateCategoryRequest : validateCategoryRequest,
    validateProductRequest : validateProductRequest
}