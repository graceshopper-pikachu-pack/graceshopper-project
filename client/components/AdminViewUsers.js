import React from "react";
import {connect} from "react-redux"
import { Link } from "react-router-dom";
import { fetchAdminData, updateAdminData } from "../store/admin";

class AdminView extends React.Component{
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

  handleUpdate(user) {
    this.props.updateData(user);
  }

  render() {
    const Checkbox = (props) => <input type="checkbox" {...props} />;

  const adminUser = this.props.user;
  console.log(adminUser)
  console.log(props)
  const route = `/admin/users/edit/${adminUser.id}`;

  return (
    <div className="row">
      <Checkbox
        id={adminUser.id}
        name={adminUser.username}
        value={adminUser.username}
        checked={adminUser.checked}
        onChange={() => props.handleChecked(props.index, adminUser.id)}
      />
      <div className="admin-dashboard-username">{adminUser.username}</div>
      <div className="admin-dashboard-firstName">{adminUser.firstName}</div>
      <div className="admin-dashboard-lastname">{adminUser.lastName}</div>
      <div className="admin-dashboard-email">{adminUser.email}</div>
      <div className="admin-dashboard-address">{adminUser.address}</div>
      <div className="admin-dashboard-adminstatus">{adminUser.adminStatus}</div>
      <Link to={route}>Edit</Link>
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
    updateData: (user) => dispatch(updateAdminData(user)),
  };
};

export default connect(mapState, mapDispatch)(AdminView);



