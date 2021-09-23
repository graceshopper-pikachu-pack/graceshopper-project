import React from "react";
import { connect } from "react-redux";
import { incrementCartItem, decrementCartItem, fetchCartItem } from "../store";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleProduct: {},
      quantity: 0,
      errors: {
        quantity: "",
      },
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    // handles in the redux store for both guest and signed in
    if (this.props.product.id) {
      this.setState({
        singleProduct: this.props.product,
      });

      this.props.fetchCartItem({
        productId: this.props.product.id,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleCartItem !== this.props.singleCartItem) {
      if (this.props.singleCartItem.id === this.state.singleProduct.id) {
        this.setState({
          singleProduct: this.props.singleCartItem,
          quantity: this.props.singleCartItem.quantity,
        });
      }
    }
  }

  handleIncrement(evt) {
    evt.preventDefault();

    // if there are no errors in the quantity
    if (!this.state.errors.quantity) {
      this.props.incrementCartItem({
        productId: this.state.singleProduct.id,
        cartItemId: this.state.singleProduct.cartItemId,
        quantity: this.state.singleProduct.quantity,
      });
    }
  }

  handleDecrement(evt) {
    evt.preventDefault();

    // if there are no errors in the quantity
    if (!this.state.errors.quantity) {
      this.props.decrementCartItem({
        productId: this.state.singleProduct.id,
        cartItemId: this.state.singleProduct.cartItemId,
        quantity: this.state.singleProduct.quantity,
      });
    }
  }

  render() {
    if (!this.props.product) {
      return null;
    }

    const routeToProduct = () => {
      const route = `/products/${this.props.product.id}`;
      this.props.history.push(route);
    };

    const { singleProduct, quantity, errors } = this.state;

    return (
      <div className="column">
        <img src={singleProduct.imageUrl} onClick={routeToProduct} />
        <div className="row">
          <h2>Product Name: {singleProduct.productName}</h2>
          <h3>Category: {singleProduct.category}</h3>
          <h3>Price: {singleProduct.price}</h3>
          <button onClick={this.handleIncrement}>Add to Cart</button>
          <h3>Quantity: {quantity}</h3>
          <button onClick={this.handleDecrement}>Subtract from Cart</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleCartItem: state.singleCartItem,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCartItem: (productId) => dispatch(fetchCartItem(productId)),
    incrementCartItem: (cartItem) => dispatch(incrementCartItem(cartItem)),
    decrementCartItem: (cartItem) => dispatch(decrementCartItem(cartItem)),
  };
};

export default connect(mapState, mapDispatch)(Product);
