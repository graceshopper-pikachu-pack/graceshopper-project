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
import AdminDashboard from "./components/AdminDashboard";
import Admin from "./components/AdminPage";
import AdminView from "./components/AdminViewUsers";
import EditUser from "./components/EditUser";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import ConfirmationPage from "./components/ConfirmationPage";
import {
  LoggedInRoute,
  AdminRoute,
  GuestRoute,
} from "./components/ProtectedRoutes";
import NotFound from "./components/NotFound";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    if (isLoggedIn === undefined) {
      return null;
    }

    return (
      <div>
        {/* code for GENERAL VIEWERS */}
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />

          <GuestRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/login"
            component={Login}
          />
          <GuestRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/signup"
            component={Signup}
          />

          <LoggedInRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/home"
            component={Home}
          />
          <LoggedInRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/profile"
            component={UserPage}
          />
          <LoggedInRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/confirmation"
            component={ConfirmationPage}
          />

          <AdminRoute isAdmin={isAdmin} exact path="/admin" component={Admin} />
          <AdminRoute
            isAdmin={isAdmin}
            exact
            path="/admin/products"
            component={AdminDashboard}
          />
          <AdminRoute
            isAdmin={isAdmin}
            exact
            path="/admin/products/add"
            component={AddProduct}
          />
          <AdminRoute
            isAdmin={isAdmin}
            exact
            path="/admin/products/edit/:productId"
            component={EditProduct}
          />

          <AdminRoute
            isAdmin={isAdmin}
            exact
            path="/admin/users"
            component={AdminView}
          />
          <AdminRoute
            isAdmin={isAdmin}
            exact
            path="/admin/users/edit/:userId"
            component={EditUser}
          />
          <Route path="*" component={NotFound}></Route>
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
    isLoggedIn: state.auth.loggedIn,
    isAdmin: state.auth.adminStatus,
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
