import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { fetchAdminData, updateAdminData } from "../store/admin";
import ProductsList from "./ProductsList";

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

  renderUserState() {
    this.setState({ current: this.props.users });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => this.props.history.push("/admin/products")}
        >
          Products
        </button>
        {/* <button type="button" onClick={() => }>
          Users
        </button> */}
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
