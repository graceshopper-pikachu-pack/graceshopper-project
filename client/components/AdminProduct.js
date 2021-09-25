import React from "react";

const Checkbox = (props) => <input type="checkbox" {...props} />;

const AdminProduct = (props) => {
  const adminProduct = props.product;

  return (
    <div className="row">
      <Checkbox
        id={adminProduct.id}
        name={adminProduct.productName}
        value={adminProduct.productName}
        checked={adminProduct.checked}
        onChange={() => props.handleChecked(props.index)}
      />
      <img className="admin-dashboard-img" src={adminProduct.imageUrl} />
      <div className="admin-dashboard-name">{adminProduct.productName}</div>
      <div className="admin-dashboard-stock-num">
        {adminProduct.stockNumber}
      </div>
      <div className="admin-dashboard-price">{adminProduct.price}</div>
      <div className="admin-dashboard-stock">{adminProduct.stockQuantity}</div>
      <div className="admin-dashboard-category">{adminProduct.category}</div>
      <div className="admin-dashboard-date">{adminProduct.createdAt}</div>
    </div>
  );
};

export default AdminProduct;
