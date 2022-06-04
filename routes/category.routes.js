

const categoryController = require("../controllers/category.controller.js");

module.exports = function(app){

    app.post("/ecomm/api/v1/categories",categoryController.create);

    app.get("/ecomm/api/v1/categories",categoryController.findAll);

    app.get("/ecomm/api/v1/categories/:id",categoryController.findOne);

    app.put("/ecomm/api/v1/categories/:id",categoryController.update);

    app.delete("/ecomm/api/v1/categories/:id",categoryController.delete);
}