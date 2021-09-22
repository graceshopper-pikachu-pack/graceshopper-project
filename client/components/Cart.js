import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { clearLocalCart, fetchCart, clearCart } from "../store";

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.props.fetchCart();

    this.setState({
      cart: this.props.cart,
    });
  }

  componentWillUnmount() {
    this.props.clearCart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
    }
  }

  render() {
    const cart = this.state.cart || [];
    console.log("cart", cart);

    return (
      <div>
        {!cart.length ? (
          <h4>There are no items in your cart!</h4>
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
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    clearLocalCart: () => clearLocalCart(),
    clearCart: () => dispatch(clearCart()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Cart);
