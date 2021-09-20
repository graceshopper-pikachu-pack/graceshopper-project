const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: Sequelize.ENUM("pending", "shipped", "completed", "cancelled"),
});

module.exports = Order;
