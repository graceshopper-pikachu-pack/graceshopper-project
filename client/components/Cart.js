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
      user: {},
      cart: [],
      errors: "",
      totalPrice: 0,
    };
    this.clearCart = this.clearCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();

    this.setState({
      cart: this.props.cart,
    });
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
      this.calculateTotalPrice(this.props.cart);
    }
  }

  calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((cartItem) => {
      totalPrice += cartItem.price * cartItem.quantity;
    });

    this.setState({ totalPrice: totalPrice });
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
          <div className="cart-message">
            <h4>There are no items in your cart!</h4>
            <img
              className="img-no-items-cart"
              src="https://images.alphacoders.com/997/thumb-1920-997932.jpg"
              width="1000"
            />
          </div>
        ) : (
          <div className="full-cart">
            {this.state.errors ? (
              <h6 className="error">{this.state.errors}</h6>
            ) : null}
            <div className="full-cart-btns">
              <button onClick={this.placeOrder}>Place Order</button>
              <button onClick={this.clearCart}>Clear Cart</button>
              <h2 className="total-price">
                Subtotal: ${this.state.totalPrice}.00
              </h2>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cartitem-column">
                <table className="cartitem-table">
                  <thead className="cartitem-head">
                    <tr className="cartitem-row">
                      <th>Product:</th>
                      <th>Quantity:</th>
                      <th>Total Animal Price:</th>
                    </tr>
                  </thead>
                  <tbody className="cartitem-info">
                    <tr className="cartitem-row">
                      <CartItem
                        item={item}
                        key={item.id}
                        history={this.props.history}
                      />
                      <td> $ {item.price * item.quantity}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
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
    fetchCart: () => dispatch(fetchCart()),
    clearCart: () => dispatch(clearCart()),
    submitOrder: (order) => dispatch(submitOrder(order)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
