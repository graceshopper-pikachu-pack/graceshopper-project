import React from "react";
import {connect} from "react-redux"
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

    const adminUsers = this.props.users;
    console.log("user: ", adminUsers)
    console.log("props", this.props)

    return (
      <table className="admin-table">
        <thead >
            <tr className="admin-dashboard-head">
              <td className="admin-dashboard-name">UserName:</td>
              <td className="admin-dashboard-latin-name">First Name:</td>
              <td className="admin-dashboard-stock-num">Last Name:</td>
              <td className="admin-dashboard-price">Email:</td>
              <td className="admin-dashboard-stock">Admin:</td>

            </tr>
          </thead>

          {adminUsers.map((adminUser) => {
        return(
          <tbody key={adminUser.id}>
            <tr className="admin-dashboard-head">
              <td>{adminUser.username} </td>
              <td> {adminUser.firstName} </td>
              <td>{adminUser.lastName} </td>
              <td>{adminUser.email} </td>
              <td>{adminUser.adminStatus.toString()} </td>

            </tr>
            </tbody>
        )
      })}

    </table>
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



