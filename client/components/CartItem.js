import React from "react";
import { connect } from "react-redux";
import { editCart } from "../store";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      errors: {
        quantity: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.routeToProduct = this.routeToProduct.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity,
    });
  }

  handleChange(evt) {
    // front-end error handling
    evt.preventDefault();
    const { name, value } = evt.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid quantity
    if (isNaN(value) || parseInt(value) !== Number(value) || value < 0) {
      errors.quantity = "Please input a valid number";
    } else if (value > this.props.item.stockQuantity) {
      errors.quantity = "Requested quantity in cart exceeds stock quantity";
    } else {
      errors.quantity = "";
    }

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleClick(evt) {
    evt.preventDefault();

    // if there are no errors in the quantity
    if (!this.state.errors.quantity) {
      this.props.editCart({
        cartItemId: this.props.item.cartItemId,
        quantity: this.state.quantity,
      });
    }
  }

  routeToProduct() {
    const route = `/products/${this.props.item.id}`;
    this.props.history.push(route);
  }

  render() {
    // console.log(this.props.item);
    if (!this.props.item) {
      return null;
    }
    const { quantity, errors } = this.state;
    const item = this.props.item;
    return (
      <div className="column">
        <img src={item.imageUrl} onClick={this.routeToProduct} />
        <div className="row">
          <h4>Product Name: {item.productName}</h4>
          <h5>Price: {item.price}</h5>

          {errors.quantity ? (
            <h6 className="error">{errors.quantity}</h6>
          ) : null}
          <label htmlFor="quantity">
            <small>Quantity in Cart:</small>
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
          <button onClick={this.handleClick}>Change Quantity</button>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    editCart: (editedCartItem) => dispatch(editCart(editedCartItem)),
  };
};

export default connect(null, mapDispatch)(CartItem);
