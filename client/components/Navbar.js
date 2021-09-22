import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <h1> The Animal Conservancy </h1>
      </div>
      <ul className="navbar_links">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products"> Animals </Link>
            <Link to="/cart">
              <img
                className="cart_image"
                src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                width="25"
                alt="shopping cart"
                //need to make a cart counter
              />
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/products"> Animals </Link>
            <Link to="/cart">
              <img
                className="cart_image"
                src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                width="25"
                alt="shopping cart"
                //need to make a cart counter
              />
            </Link>
            <Link to="/login"> Login</Link>
            <Link to="/signup"> Sign Up</Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
<<<<<<< HEAD
	return {
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
=======
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
>>>>>>> eae61cad13eef0709d567110ae14f3269e0da106
};

export default connect(mapState, mapDispatch)(Navbar);
