const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const categories = [
  "amphibians",
  "birds",
  "fish",
  "invertebrates",
  "mammals",
  "reptiles",
];
const Product = db.define("product", {
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
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-otter-appafo-ghondsary.jpg",
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [categories],
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// sets default value if image is empty string
Product.beforeValidate((product, options) => {
  if (options.fields.includes("imageUrl")) {
    if (product.imageUrl === "") {
      product.imageUrl =
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-otter-appafo-ghondsary.jpg";
    }
  }
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
