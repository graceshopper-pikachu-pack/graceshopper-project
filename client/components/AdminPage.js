import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { fetchAdminData, updateAdminData } from "../store/admin";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      users: [],
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  handleUpdate(product) {
    this.props.updateData(product);
  }

  render() {
    const adminUser = this.props.users;

    return (
      <div className="admin-container">
        <div className="admin-page">
          <Link className="admin-link" to="/admin/products">
            <span className="admin-span">Edit Animals</span>
          </Link>
          <Link className="admin-link" to="/admin/users">
            <span className="admin-span">View Users</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.admin.products,
    users: state.admin.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData: () => dispatch(fetchAdminData()),
    updateData: (product) => dispatch(updateAdminData(product)),
  };
};

export default connect(mapState, mapDispatch)(Admin);
