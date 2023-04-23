const { DataTypes } = require("sequelize")

 
module.exports = (Sequelize) => {
    Sequelize.define("links", {
     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
     },
     name: {
        type: DataTypes.STRING,
        allowNull: false
     },
     link: {
        type: DataTypes.STRING,
        allowNull: false
     },
    },
    {timestamps: false}
    )
}