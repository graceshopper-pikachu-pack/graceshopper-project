import React from "react";

const Product = (props) => {
  const routeToProduct = () => {
    const route = `/products/${props.product.id}`;
    props.history.push(route);
  };

  const singleProduct = props.product;

  return (
    <div className="column">
      <img src={singleProduct.imageUrl} onClick={routeToProduct} />
      <div className="row">
        <h2>Product Name: {singleProduct.productName}</h2>
        <h3>Price: {singleProduct.price}</h3>
        {singleProduct.errors ? (
          <h6 className="error">{singleProduct.errors}</h6>
        ) : null}
        <button
          onClick={(evt) => {
            props.handleIncrement(singleProduct, evt);
          }}
        >
          Add to Cart
        </button>
        <h3>Quantity: {singleProduct.quantity}</h3>
        <button
          onClick={(evt) => {
            props.handleDecrement(singleProduct, evt);
          }}
        >
          Subtract from Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
