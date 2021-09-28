import React from "react";
import { Link } from "react-router-dom";

const Checkbox = (props) => (
  <td>
    <input type="checkbox" {...props} />
  </td>
);

const AdminProduct = (props) => {
  const adminProduct = props.product;
  const route = `/admin/products/edit/${adminProduct.id}`;

  return (
    <tr className="admin-dashboard-row" key={adminProduct.id}>
      <Checkbox
        id={adminProduct.id}
        name={adminProduct.productName}
        value={adminProduct.productName}
        checked={adminProduct.checked}
        onChange={() => props.handleChecked(props.index, adminProduct.id)}
      />

      <td>
        <img className="admin-dashboard-img" src={adminProduct.imageUrl} />
      </td>
      <td className="admin-dashboard-name">{adminProduct.productName}</td>
      <td className="admin-dashboard-latin-name">{adminProduct.latinName}</td>
      <td className="admin-dashboard-stock-num">{adminProduct.stockNumber}</td>
      <td className="admin-dashboard-price">{adminProduct.price}</td>
      <td className="admin-dashboard-stock">{adminProduct.stockQuantity}</td>
      <td className="admin-dashboard-category">{adminProduct.category}</td>
      <td className="admin-dashboard-date">
        {adminProduct.createdAt.slice(0, 10)}
      </td>
      <td>
        <Link to={route}>Edit</Link>
      </td>
    </tr>
  );
};

export default AdminProduct;
