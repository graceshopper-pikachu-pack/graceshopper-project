import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { fetchCart, clearCart, submitOrder, getToken } from "../store";

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      errors: "",
    };
    this.clearCart = this.clearCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();

    this.setState({
      cart: this.props.cart,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
    }
  }

  clearCart(evt) {
    evt.preventDefault();

    if (this.state.cart.length) {
      this.props.clearCart();
    }
  }

  placeOrder(evt) {
    evt.preventDefault();

    const token = getToken();

    if (token) {
      console.log(this.state.cart);
      this.props.submitOrder([...this.state.cart]);
      this.props.clearCart();
      this.props.history.push("/confirmation");
    } else {
      this.setState({
        errors: "Please login or sign up to place your order!",
      });
    }
  }

  render() {
    const cart = this.state.cart || [];

    return (
      <div>
        {!cart.length ? (
          <h4>There are no items in your cart!</h4>
        ) : (
          <>
            {this.state.errors ? (
              <h6 className="error">{this.state.errors}</h6>
            ) : null}
            <button onClick={this.placeOrder}>Place Order</button>
            <button onClick={this.clearCart}>Clear Cart</button>
            {cart.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                history={this.props.history}
              />
            ))}
          </>
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
    clearCart: () => dispatch(clearCart()),
    submitOrder: (order) => dispatch(submitOrder(order)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
