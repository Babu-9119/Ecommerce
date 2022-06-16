const {requestValidator,authjwt}= require('../middlewares')

const categoryController = require("../controllers/category.controller.js");




module.exports = function(app){
    //api to create a category
    app.post("/ecomm/api/v1/categories",[requestValidator.validateCategoryRequest,authjwt.verifyToken,authjwt.isAdmin],categoryController.create);
    //api to get all the categories
    app.get("/ecomm/api/v1/categories",categoryController.findAll);
    //api to get the particular category by id
    app.get("/ecomm/api/v1/categories/:id",categoryController.findOne);
    //api to update the existing category
    app.put("/ecomm/api/v1/categories/:id",[requestValidator.validateCategoryRequest,authjwt.verifyToken,authjwt.isAdmin],categoryController.update);
    //api to delete the particular category by id
    app.delete("/ecomm/api/v1/categories/:id",[authjwt.verifyToken,authjwt.isAdmin],categoryController.delete);
}