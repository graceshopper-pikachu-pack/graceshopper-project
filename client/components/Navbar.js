import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar_logo">
          <h1> Animal Conservancy </h1>
        </div>
        <ul className="navbar_links">
          <div>
            <Link to="/products"> All Animals </Link>
            <Link to="/cart">
              <img
                className="cart_image"
                src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                width="25"
                alt="shopping cart"
                //need to make a cart counter
              />
            </Link>
            <Link to="/signup"> Sign Up</Link>
          </div>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
