import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <h1> The Animal Conservancy </h1>
      </div>
      <ul className="navbar_links">
        {/* The navbar will show these links after you log in */}
        <Link to="/home">Home</Link>
        <Link to="/products"> Animals </Link>
        <Link to="/cart">
          <img
            className="cart_image"
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            width="25"
            alt="shopping cart"
          />
          <div className="cart-btn">
            <span className="cart_image"> </span>
            <div className="cart-items"></div>
          </div>
        </Link>

        {isLoggedIn ? (
          !isAdmin ? (
            <div>
              <Link to="/profile"> Profile </Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/admin"> Admin</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          )
        ) : (
          <div>
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
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.adminStatus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
