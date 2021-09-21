const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");


const categories = ['Amphibians', 'Birds', 'Fish', 'Invertebrates', 'Mammals', 'Reptiles']
const Product = db.define('product', {

  stockNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  productDescription: {
    type: Sequelize.TEXT,
    defaultValue: "There is no description available for this item.",
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      //must be zero or greater. No negative.
      min: 0,
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    //default is a creative commons png. Change this later?
    defaultValue:
      "https://www.pinclipart.com/picdir/middle/0-3785_dj-inkers-animal-clipart-collection-zoo-clip-art.png",
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [categories],
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
//where does the increase and decreast of stock quantity happen?
/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
