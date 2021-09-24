import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import { fetchCart } from '../store';

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      cart: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth !== this.props.auth) {
      this.setState({
        user: { ...this.props.auth },
      });
      this.props.fetchCart(this.props.auth.id);
    }
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
    }
  }

  render() {
    const cart = this.state.cart || [];
    console.log('cart', cart);

    return (
      <div>
        {!cart.length ? (
          <h4>Loading...</h4>
        ) : (
          cart.map((item) => (
            <CartItem item={item} key={item.id} history={this.props.history} />
          ))
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Cart);
