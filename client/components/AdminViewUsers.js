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
    // const Checkbox = (this.props) => <input type="checkbox" {...this.props} />;

    const adminUsers = this.props.users;
    console.log("user: ", adminUsers)
    console.log("props", this.props)
    // const route = `/admin/users/edit/${adminUser.id}`;

    return (
      <table>
        {/* {this.props.users.map((adminUser) => {
          <div>
          <Checkbox
          id={adminUser.id}
          name={adminUser.username}
          value={adminUser.username}
          checked={adminUser.checked}
          onChange={() => this.props.handleChecked(props.index, adminUser.id)}
        />
        <div className="admin-dashboard-username">{adminUser.username}</div>
        <div className="admin-dashboard-firstName">{adminUser.firstName}</div>
        <div className="admin-dashboard-lastname">{adminUser.lastName}</div>
        <div className="admin-dashboard-email">{adminUser.email}</div>
        <div className="admin-dashboard-address">{adminUser.address}</div>
        <div className="admin-dashboard-adminstatus">{adminUser.adminStatus}</div>
        <Link to={route}>Edit</Link>
        </div>
        })
      } */}
      {adminUsers.map((adminUser) => {
        return(
          <tbody key={adminUser.id}>
              <tr className="admin-dashboard-usernames" >
                <td>Username: {adminUser.username} </td>
                <td>First Name: {adminUser.firstName} </td>
                <td> Last Name: {adminUser.lastName} </td>
                <td> Email: {adminUser.email} </td>
                <td> Admin Status: {adminUser.adminStatus.toString()} </td>

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



