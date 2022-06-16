const db = require('../models');
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
    const cart = {
        userId : req.userid
    }

    Cart.create(cart)
    .then( cart => {
        res.status(200).send(cart);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}

exports.update = (req, res) => {
    const cartId = req.params.id;
    Cart.findByPk(cartId)
    .then( cart => {
        Product.findAll({
            where : {
                id : req.body.productIds
            }
        })
        .then( items => {
            if(!items){
                res.status(400).send({
                    message:"items trying to add does not exist"
                })
            }

            cart.setProducts(items)
            .then(() => {
                var cost = 0;
                var productsSelected = [];
                cart.getProducts()
                .then( products => {
                    for(let i = 0; i< products.length;i++){
                        cost += products[i].cost;
                        productsSelected.push({
                            id : products[i].id,
                            name : products[i].name,
                            cost : products[i].cost
                        })
                    }
                    res.status(200).send({
                        id : cartId,
                        productsSelected : productsSelected,
                        cost : cost
                    })
                })
            })
            .catch(err => {
                res.status(500).send({
                    message : "some internal error while updating the cart"
                })
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message : "some internal error whilr fetching the cart details"
        })
    })

}

exports.getCart = (req,res) => {
    Cart.findByPk(req.params.cartId).then(cart => {
        var cost = 0;
        const ProductSelected = [];
        cart.getProducts().then(products => {

            for(i = 0; i < products.length; i++) {
                cost = cost + products[i].cost;
                ProductSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                });
            }

            res.status(200).send({
                id: cart.id,
                productSelected: ProductSelected,
                cost: cost
            })
        })
    })
}