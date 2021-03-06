const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0,
  },
});

module.exports = Cart;
