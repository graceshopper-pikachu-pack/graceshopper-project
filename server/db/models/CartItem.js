const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      isInt: true,
    },
  },
});

module.exports = CartItem;
