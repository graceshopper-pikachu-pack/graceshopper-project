import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar_logo">
          <h1> Animal Conservacy </h1>
        </div>
        <ul className="navbar_links">
          <li>
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
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;

// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { logout } from '../store';

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>Animals Store</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// );

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(Navbar);
