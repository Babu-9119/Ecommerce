const db = require('../models');

const Product = db.product;

/**
 * to insert data into a database
 */
exports.create = (req, res) =>{
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category should not be empty!"
        })
        return;
    }

    const product = {
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost
    }

    Product.create(product)
    .then(product => {
        console.log(`Product name: [${product.name} inserted into database]`)
        res.status(200).send(product);
    })
    .catch(err =>{
        console.log(`issue in inserting product name:[${product.name}]`);
        console.log(`error message: [${err.message}]`)
        res.status(500).send({
            message:"error while inserting data"
        })
    })
}

/**
 * to get all products present in database
 */

exports.findAll = (req,res) => {
    let categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Product.findAll({
            where:{name:categoryName}
        })

    }else{
        promise = Product.findAll();
    }

    promise.then(products => {
        res.status(200).send(products)
    })

    promise.catch(err => {
        res.status(500).send({
            message:"some intenal error while fetching products from database"
        })
    })
}

/**
 * to get the product based on id
 */

exports.findOne = (req,res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
    .then(product =>{
        if(!product){
            return res.status(400).send({
                massage:`product not found with product id: [${productId}]`
            })
        }
        res.status(200).send(product);
    })
    .catch(err => {
        res.status(500).send({
            message: "some internal error while fetching product based on product id"
        })
    })
}

/**
 *to update the existing products also
 */

 exports.update = (req,res) => {

    const product = {
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost
    }

    let productId = req.params.id;

    Product.update(product,{
        where: {id:productId}
    })
    .then((updatedProduct => {
        Product.findByPk(productId)
        .then(product => {
            if(!product){
                return res.status(404).send({
                    message:`product does not exists with product id [${productId}] to update`
                })
            }
            res.status(200).send(product);
        })
        .catch(err => {
            res.status(500).send({
                message:"updated successfully but error while getting updated details of product"
            })
        })
    }))
    .catch(err => {
        res.status(500).send({
            message:" error while updating the product details"
        })
    })
    
 }


/**
 * to delete a category based on id
 */

exports.delete = (req,res) =>{
    const productId = req.params.id;

    Product.destroy({
        where:{id:productId}
    })
    .then(product => {
        if(!product){
            return res.status(404).send({
                message:"no product eith requested product id to delete"
            })
        }
        res.status(200).send({
            message:"seccessfully deleted the product with product id"
        })
    })
    .catch(err => {
        res.status(500).send({
            message:"error while deleting the data"
        })
    })
}

 