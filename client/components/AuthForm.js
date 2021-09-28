import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

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
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" required />
          </div>
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
              Don't have an account? Sign Up <a href="/signup"> here </a>
            </span>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
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
