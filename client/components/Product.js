import React from "react";
import { connect } from "react-redux";
import { incrementCartItem, decrementCartItem } from "../store";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleProduct: {},
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
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        singleProduct: {
          quantity: this.props.singleProduct.quantity,
        },
      });
    }

    if (prevProps.product.quantity !== this.props.product.quantity) {
      this.setState({
        singleProduct: {
          quantity: this.props.singleProduct.quantity,
        },
      });
    }
  }

  handleIncrement(evt) {
    evt.preventDefault();

    let errors = this.state.errors;
    // error handling for valid quantity
    if (this.state.quantity + 1 > this.props.product.stockQuantity) {
      errors.quantity = "Requested quantity in cart exceeds stock quantity";
    } else {
      errors.quantity = "";
    }

    this.setState({
      errors: {
        quantity: errors.quantity,
      },
    });

    // if there are no errors in the quantity
    if (!errors.quantity) {
      this.props.incrementCartItem({
        productId: this.state.singleProduct.id,
        cartItemId: this.state.singleProduct.cartItemId,
        quantity: this.state.singleProduct.quantity,
      });
    }
  }

  handleDecrement(evt) {
    evt.preventDefault();

    let errors = this.state.errors;
    // error handling for valid quantity
    if (this.state.quantity - 1 < 0) {
      errors.quantity = "This item is not in your cart!";
    } else {
      errors.quantity = "";
    }

    this.setState({
      errors: {
        quantity: errors.quantity,
      },
    });

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

    const { singleProduct, errors } = this.state;

    return (
      <div className="column">
        <img src={singleProduct.imageUrl} onClick={routeToProduct} />
        <div className="row">
          <h2>Product Name: {singleProduct.productName}</h2>
          <h3>Price: {singleProduct.price}</h3>
          {errors.quantity ? (
            <h6 className="error">{errors.quantity}</h6>
          ) : null}
          <button onClick={this.handleIncrement}>Add to Cart</button>
          <h3>Quantity: {singleProduct.quantity}</h3>
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
    incrementCartItem: (cartItem) => dispatch(incrementCartItem(cartItem)),
    decrementCartItem: (cartItem) => dispatch(decrementCartItem(cartItem)),
  };
};

export default connect(mapState, mapDispatch)(Product);
