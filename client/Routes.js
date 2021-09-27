import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthForm";
import { Signup } from "./components/SignupForm";
import Home from "./components/Home";
import ProductsList from "./components/ProductsList";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import UserPage from "./components/UserPage";
//import AdminPage from "./components/AdminPage";
import AdminDashboard from "./components/AdminDashboard";
import Admin from "./components/AdminPage";
import AdminUser from "./components/AdminViewUsers";
import EditUser from "./components/EditUser";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import ConfirmationPage from "./components/ConfirmationPage";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {/* code for GENERAL VIEWERS */}
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/products" component={AdminDashboard} />
          <Route exact path="/admin/products/add" component={AddProduct} />
          <Route
            exact
            path="/admin/products/edit/:productId"
            component={EditProduct}
          />
          <Route exact path="/admin/users" component={AdminUser} />
          <Route
            exact
            path="/admin/users/edit/:userId"
            component={EditUser}
          />
          {!isLoggedIn ? (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route exact path="/home" component={ProductsList} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={UserPage} />
              <Route exact path="/confirmation" component={ConfirmationPage} />
            </Switch>
          )}
          {/* {isAdmin && (
						<>
							<Route exact path="/admin" component={AdminPage} />
						</>
					)} */}

          {/* <Redirect to="/home" /> */}
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
