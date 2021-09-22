import React from "react";

const CartItem = (props) => {
  if (!props.item) {
    return null;
  }

  const routeToProduct = () => {
    const route = `/products/${item.id}`;
    props.history.push(route);
  };

  const item = props.item;
  return (
    <div className="column" onClick={routeToProduct}>
      <img src={item.imageUrl} />
      <div className="row">
        <h4>Product Name: {item.productName}</h4>
        <h5>Price: {item.price}</h5>
        <h5>Quantity: {item.quantity}</h5>
        <h5>Product Description: {item.productDescription}</h5>
      </div>
    </div>
  );
};

export default CartItem;
