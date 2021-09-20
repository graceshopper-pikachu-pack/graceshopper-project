const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("orderItem", {
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
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
