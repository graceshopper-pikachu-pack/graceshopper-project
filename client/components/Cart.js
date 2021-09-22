import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { clearLocalCart, fetchCart, getLocalCart } from "../store";

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
    if (!this.props.isLoggedIn) {
      this.setState({
        cart: this.props.cart,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
    }
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.props.clearLocalCart();
    }
  }

  render() {
    const cart = this.state.cart || [];
    console.log("cart", cart);

    // let localCart = localStorage.getItem("cart");
    // localCart = JSON.parse(localCart);
    // console.log("empty localstoragecart", localCart);

    // let cartCopy = [...localCart];
    // cartCopy.push({ id: 1 });

    // localStorage.setItem("cart", JSON.stringify(cartCopy));
    // localCart = localStorage.getItem("cart");
    // localCart = JSON.parse(localCart);
    // console.log("with obj localstoragecart", localCart);

    // if (localCart) {
    //   console.log("local cart", localCart);
    // }

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
    getLocalCart: () => dispatch(getLocalCart()),
    clearLocalCart: () => dispatch(clearLocalCart()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Cart);
