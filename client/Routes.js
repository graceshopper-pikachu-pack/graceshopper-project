import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import { Signup } from './components/SignupForm';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		/* require the following routes: 
    everyone - guests, users, admin
    isLoggedIn - users only
    isAdmin - admin only
    */

		return (
			<div>
				<Route path="/home" component={ProductsList} />
				<Route exact path="/products" component={ProductsList} />
				<Route exact path="/products/:productId" component={SingleProduct} />
				<Route exact path="/cart" component={Cart} />
				<Redirect to="/home" />
				<Route exact path="/products" component={ProductsList} />
				<Route exact path="/products/:productId" component={SingleProduct} />
				<Route exact path="/cart" component={Cart} />
				(if !isLoggedIn)
				{
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
					</Switch>
				}
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
