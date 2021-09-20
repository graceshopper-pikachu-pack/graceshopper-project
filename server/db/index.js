//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

//associations could go here!
User.hasOne(Cart);
Cart.hasOne(User);

User.hasMany(Order);
Order.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = {
  db,
  models: {
    User,
    Cart,
    CartItem,
    Order,
    OrderItem,
  },
};
