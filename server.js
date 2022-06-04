const express = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db = require("./models");
const Category = db.category;
const Product = db.product;

db.sequelize.sync({force:true})
.then(() => {
    console.log("tables are dropped and created");
    initc();
    initp();
})

function initc(){
    var categories = [
    {
        name:"Electronics",
        description:"this category will contain all electronic categories"

    },
    {
        name:"Kitchen Items",
        description:"this category contains kitchen items"

    }];

    Category.bulkCreate(categories)
    .then(() => {
        console.log("categories are initialised")
    })
    .catch( err => {
        console.log("error while initialising category table")
    })
}

function initp(){
    var products = [{
        name:"mobile",
        description:"Mi note 6 pro",
        cost:13999
    },
    {
        name:"headset",
        description:"Boat 330 pro",
        cost:1599
    }];

    Product.bulkCreate(products)
    .then(() =>{
        console.log("products are initialised")
    })
    .catch(err => {
        console.log("error while initialising the database")
    })

}

require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
app.listen(serverConfig.PORT, () =>{
    console.log(`server started on PORT: ${serverConfig.PORT}`)
});