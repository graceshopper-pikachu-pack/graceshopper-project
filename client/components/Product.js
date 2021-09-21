import React from "react";

const Product = (props) => {
  if (!props.product) {
    return null;
  }

  const product = props.product;
  return (
    <div className="column">
      <img src={product.imageUrl} />
      <div className="row">
        <h2>Product Name: {product.productName}</h2>
        <h3>Product Description: {product.productDescription}</h3>
        <h3>Category: {product.category}</h3>
        <h3>Price: {product.price}</h3>
      </div>
    </div>
  );
};

export default Product;