
const db = require("../models");

const Category = db.category;
/**
 * to create and save the new categories
 */
exports.create = (req,res) => {
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category should nor be empty !"
        })
        return;
    }


    const category = {
        name: req.body.name,
        description:req.body.description
    }

    Categoru.create(category).then(category =>{
        console.log(`Category name: [${category.name} inserted into database] `)
    }).catch(err =>{
        console.log(`Issue in iserting category name: [${category.name}]`);
        console.log(`error message:[${err.message}]`);
        res.status(500).send({
            message:"some internal error while creating category"
        })
    })
};

/**
 * to get all categories
 */

exports.findAll = (req,res) => {
    let categoryName = req.query.name;
    let promise;

    if(categoryName){
        promise = Category.findAll({
            where:{
                name:categoryName
            }
        })
    }else{
        promise = Category.findAll();
    }

    promise.then((categories) =>{
        res.status(200).send(categories);
    })
    .catch(err => {
        res.status(500).send({
            message:"some internal error while fetching the categories"
        })

    })
};

/**
 * get a category based on category id
 */

exports.findOne = (req,res) => {

    const categoryId = req.params.id;
    Category.findByPk(categoryId)
    .then(category => {
        res.status(200).send(category);
    })
    .catch(err => {
        res.status(500).send({
            message:"some internal error while fetching data based on category id"
        })
    })

}

/**
 * update the existing category
 */

exports.update = (req,res) => {

    const category = {
        name: req.body.name,
        description:req.body.description
    };

    const categoryId = req.params.id;

    Category.update(category, {
        where:{id:categoryId}
    })
    .then(updatedCategory =>{
        category.findByPk(categoryId)
        .then(category => {
            res.status(200).send(category)
        })
        .catch(err => {
            res.status(500).send({
                message:"some internal error while fetching the updated category but update was successfull"
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message:"some internal error while updating ths category based on id"
        })
    })

}