const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");


const categories = [
  "AMPHIBIANS",
  "BIRDS",
  "FISH",
  "INVERTEBRATES",
  "MAMMALS",
  "REPTILES",
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
  latinName: {
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
      min: 0,
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-otter-appafo-ghondsary.jpg",
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [categories],
      isUppercase: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  funFact: {
    type: Sequelize.TEXT,
    defaultValue: `Uh no! We don't have a fun fact for this animal.`,
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
