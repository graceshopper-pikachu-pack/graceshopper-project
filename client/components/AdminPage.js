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

    const adminUser = this.props.users
    console.log("USERS", adminUser)
    console.log("props", this.props);
    return (
      <div>
        <Link to="/admin/products">
          <button type="button">
            Edit Products
          </button>
        </Link>
        <Link to="/admin/users">
          <button type="button">
            View Users
          </button>
        </Link>
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
