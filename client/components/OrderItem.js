import React from "react";

const OrderItem = (props) => {
  const orderItem = props.orderItem || {};

  return (
    <div className="column">
      <img className="order-item-img" src={orderItem.imageUrl} />
      <div className="order-item-name">Name: {orderItem.productName}</div>
      <div className="order-item-stock-num">
        Stock Number: {orderItem.stockNumber}
      </div>
      <div className="order-item-price">
        Price at Purchase: ${orderItem.price}
      </div>
      <div className="order-item-stock">Quantity: {orderItem.quantity}</div>
    </div>
  );
};

export default OrderItem;
