

module.exports = (sequelize,Sequelize) => {
     const product = sequelize.define("product",{
         id:{
             type:Sequelize.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         name :{
             type: Sequelize.STRING,
             allowNull: false
         },
         description:{
             type: Sequelize.STRING
         },
         cost:{
             type: Sequelize.INTEGER,
             allowNull: false
         }
     },{
         tablename:'products'
     })

     return product;
}