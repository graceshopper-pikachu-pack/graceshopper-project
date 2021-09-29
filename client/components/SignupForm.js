import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const SignupForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className='form-content'>
      <form onSubmit={handleSubmit} name={name}>
        <h1 className='signup-text'>🐜 Join our Animal Family today 🦓</h1>
        <div className='form-inputs'>
          <div>
            <label htmlFor='firstName'>
              <small>First Name</small>
            </label>
            <input name='firstName' type='text' required />
          </div>
          <div>
            <label htmlFor='lastName'>
              <small>Last Name</small>
            </label>
            <input name='lastName' type='text' required />
          </div>
          <div className='signup-email'>
            <label htmlFor='email'>
              <small>Email</small>
            </label>
            <input name='email' type='text' required />
          </div>
          <div className='signup-username'>
            <label htmlFor='username'>
              <small>Username</small>
            </label>
            <input name='username' type='text' required />
          </div>
          <div className='signup-pass'>
            <label htmlFor='password'>
              <small>Password</small>
            </label>
            <input name='password' type='password' required />
          </div>
          <div className='signup-add'>
            <label htmlFor='address'>
              <small>Address</small>
            </label>
            <input name='address' type='text' required />
          </div>
          <div className='btn-signup'>
            <button className='submit-signup' type='submit'>
              {displayName}
            </button>
            <span className='form-input-login'>
              Already have an account? Login <a href='/login'> here </a>
            </span>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const address = evt.target.address.value;

      const formData = {
        username,
        firstName,
        lastName,
        password,
        email,
        address,
      };

      dispatch(authenticate(formData, formName));
    },
  };
};
export const Signup = connect(mapSignup, mapDispatch)(SignupForm);
