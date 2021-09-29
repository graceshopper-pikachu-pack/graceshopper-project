import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} name={name}>
        <h1 className="login-text"> Our Animals Miss You </h1>
        <div className="signup-input">
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" required />

          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" required />
          </div>

          <div className="btn-login">
            <button className="submit-login" type="submit">
              {displayName}
            </button>
            <span className="form-input-login">
              Don't have an account yet? Sign Up <a href="/signup"> here </a>
            </span>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const formData = {
        username,
        password,
      };
      dispatch(authenticate(formData, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
