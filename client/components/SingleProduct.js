import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleProduct,
  clearSingleProduct,
  addToCart,
  addToLocalCart,
} from "../store";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleProduct: {},
      quantity: 0,
      errors: {
        quantity: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId);
  }

  componentWillUnmount() {
    this.props.clearSingleProduct;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleProduct !== this.props.singleProduct) {
      this.setState({
        singleProduct: this.props.singleProduct,
      });
    }
  }

  handleChange(evt) {
    // front-end error handling
    const { name, value } = evt.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid quantity
    if (isNaN(value) || parseInt(value) !== Number(value) || value < 0) {
      errors.quantity = "Please input a valid number";
    } else if (value > this.state.singleProduct.stockQuantity) {
      errors.quantity = "Requested quantity in cart exceeds stock quantity";
    } else {
      errors.quantity = "";
    }

    // sets the copy of the error state we made with the changes we implemented through switch on the state

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleClick(evt) {
    evt.preventDefault();
    // if quantity has no errors
    if (!this.state.errors.quantity) {
      if (this.props.auth.id) {
        // CHECK IF ITEM ALREADY IN CART
        // if the user is signed in, add the item to the cart in the db
        this.props.addToCart({
          productId: this.state.singleProduct.id,
          quantity: this.state.quantity,
        });
      } else {
        // else, just add the cart to the store
        // for now, look into session storage for longer term storage
        this.props.addToLocalCart({
          productId: this.state.singleProduct.id,
          quantity: this.state.quantity,
        });
      }
    }
  }

  render() {
    const singleProduct = this.state.singleProduct || {};
    const { quantity, errors } = this.state;

    return (
      <div>
        {!singleProduct.id ? (
          <h4>Loading...</h4>
        ) : (
          <div className="column">
            <img src={singleProduct.imageUrl} />
            <div className="row">
              <h2>Product Name: {singleProduct.productName}</h2>
              <h3>Price: {singleProduct.price}</h3>
              <h3>Product Description: {singleProduct.productDescription}</h3>

              {errors.quantity ? (
                <h6 className="error">{errors.quantity}</h6>
              ) : null}
              <label htmlFor="quantity">
                <small>Add Quantity:</small>
              </label>
              <input
                name="quantity"
                type="text"
                value={quantity}
                onChange={this.handleChange}
                style={{
                  border: errors.quantity ? "2px solid red" : this.state.value,
                }}
              />

              <button onClick={this.handleClick}>Add to Cart</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    clearSingleProduct: () => dispatch(clearSingleProduct()),
    addToCart: (productId) => dispatch(addToCart(productId)),
    addToLocalCart: (productId) => dispatch(addToLocalCart(productId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
