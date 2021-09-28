import React from "react";
import { connect } from "react-redux";
import { editUser } from "../store";
import { fetchSingleUser } from "../store"

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      adminStatus: "",
      address: "",
      errors: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        adminStatus: "",
        address: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectAdminStatus = this.selectAdminStatus.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({ ...this.props.user });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username = !value.length
          ? "Please provide a valid username"
          : "";
        break;

      case "firstName":
        errors.firstName = !value.length
          ? "Please provide a valid entry for First Name"
          : "";
        break;

      case "lastName":
        errors.lastName = !value.length
          ? "Please provide a valid entry for Last Name"
          : "";
        break;

      case "email":
        if (isNaN(value) || !value.length) {
          errors.email = "Please provide a valid email address for this user";
        } else {
          errors.email = "";
        }
        break;

      case "address":
        if (isNaN(value) || !value.length) {
          errors.address = "Please provide a valid address for this user";
        } else {
          errors.address = "";
        }
        break;

      default:
        break;
    }

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const userId = this.props.match.params.userId;
    this.props.editUser({ ...this.state }, userId);
  }

  selectCategory(evt) {
    this.setState({
      category: evt.target.value,
    });
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      email,
      address,
      adminStatus,
      errors,
    } = this.state;
    return (
      <form id="edit-user-form" onSubmit={this.handleSubmit}>
        {errors.username ? <h6 className="error">{errors.username}</h6> : null}
        <label htmlFor="username">
          <small>Username:</small>
        </label>
        <input
          name="username"
          value={username}
          onChange={this.handleChange}
          style={{
            border: errors.username ? "2px solid red" : this.state.value,
          }}
        />

        {errors.firstName ? (
          <h6 className="error">{errors.firstName}</h6>
        ) : null}
        <label htmlFor="firstName">
          <small>First Name</small>
        </label>
        <input
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          style={{
            border: errors.firstName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.lastName ? <h6 className="error">{errors.lastName}</h6> : null}
        <label htmlFor="lastName">
          <small>Last Name</small>
        </label>
        <input name="lastName" value={lastName} onChange={this.handleChange} />

        {errors.email ? <h6 className="error">{errors.email}</h6> : null}
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          style={{
            border: errors.stockNumber ? "2px solid red" : this.state.value,
          }}
        />

        {errors.address ? <h6 className="error">{errors.address}</h6> : null}
        <label htmlFor="address">
          <small>Address</small>
        </label>
        <input
          name="address"
          value={address}
          onChange={this.handleChange}
          style={{
            border: errors.address ? "2px solid red" : this.state.value,
          }}
        />

        <label htmlFor="adminStatus">
          <small>Admin Status</small>
        </label>
        <select
          id="dropdown"
          value={adminStatus}
          onChange={this.selectAdminStatus}
        >
          <option value="true">Admin</option>
          <option value="false">Not Admin</option>
        </select>

        <button type="submit">Submit Edited User</button>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.singleUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleUser: (userId) => dispatch(fetchSingleUser(userId)),
    editUser: (user, userId) => dispatch(editUser(user, userId)),
  };
};

export default connect(mapState, mapDispatch)(EditUser);
