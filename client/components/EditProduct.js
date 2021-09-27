import React from "react";
import { connect } from "react-redux";
import { editProduct, fetchSingleProduct } from "../store";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      imageUrl: "",
      productDescription: "",
      stockNumber: "",
      price: "",
      stockQuantity: "",
      category: "",
      errors: {
        productName: "",
        imageUrl: "",
        productDescription: "",
        stockNumber: "",
        price: "",
        stockQuantity: "",
        category: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({ ...this.props.product });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "productName":
        errors.productName = !value.length
          ? "Please provide a name for this animal"
          : "";
        break;
      case "imageUrl":
        // match tests if the value contains valid file format
        errors.imageUrl = !value.match(/\.(jpeg|jpg|png|gif)/)
          ? "Please provide a valid image url"
          : "";
        errors.imageUrl = !value.length ? "" : errors.imageUrl;
        break;
      case "productDescription":
        errors.productDescription = !value.length
          ? "Please provide a description for this animal"
          : "";
        break;
      case "stockNumber":
        errors.stockNumber = !value.length
          ? "Please provide a valid stock number for this animal"
          : "";
        break;
      case "price":
        if (isNaN(Number(value)) || !value.length) {
          errors.price = "Please provide a valid price for this animal";
        } else {
          errors.price = "";
        }
        break;
      case "stockQuantity":
        if (isNaN(value) || !value.length) {
          errors.stockQuantity =
            "Please provide a valid stock quantity for this animal";
        } else {
          errors.stockQuantity = "";
        }
        break;
      default:
        break;
    }

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const productId = this.props.match.params.productId;
    this.props.editProduct({ ...this.state }, productId);
  }

  selectCategory(evt) {
    this.setState({
      category: evt.target.value,
    });
  }

  render() {
    const {
      productName,
      imageUrl,
      productDescription,
      stockNumber,
      price,
      stockQuantity,
      category,
      errors,
    } = this.state;
    return (
      <form id="edit-product-form" onSubmit={this.handleSubmit}>
        {errors.productName ? (
          <h6 className="error">{errors.productName}</h6>
        ) : null}
        <label htmlFor="productName">
          <small>Name:</small>
        </label>
        <input
          name="productName"
          value={productName}
          onChange={this.handleChange}
          style={{
            border: errors.productName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.imageUrl ? <h6 className="error">{errors.imageUrl}</h6> : null}
        <label htmlFor="imageUrl">
          <small>ImageUrl</small>
        </label>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={this.handleChange}
          style={{
            border: errors.imageUrl ? "2px solid red" : this.state.value,
          }}
        />

        {errors.productDescription ? (
          <h6 className="error">{errors.productDescription}</h6>
        ) : null}
        <label htmlFor="productDescription">
          <small>Description</small>
        </label>
        <input
          name="productDescription"
          value={productDescription}
          onChange={this.handleChange}
        />

        {errors.stockNumber ? (
          <h6 className="error">{errors.stockNumber}</h6>
        ) : null}
        <label htmlFor="stockNumber">
          <small>Stock Number</small>
        </label>
        <input
          name="stockNumber"
          value={stockNumber}
          onChange={this.handleChange}
          style={{
            border: errors.stockNumber ? "2px solid red" : this.state.value,
          }}
        />

        {errors.price ? <h6 className="error">{errors.price}</h6> : null}
        <label htmlFor="price">
          <small>Price</small>
        </label>
        <input
          name="price"
          value={price}
          onChange={this.handleChange}
          style={{
            border: errors.price ? "2px solid red" : this.state.value,
          }}
        />

        {errors.stockQuantity ? (
          <h6 className="error">{errors.stockQuantity}</h6>
        ) : null}
        <label htmlFor="stockQuantity">
          <small>Stock Quantity</small>
        </label>
        <input
          name="stockQuantity"
          value={stockQuantity}
          onChange={this.handleChange}
          style={{
            border: errors.stockQuantity ? "2px solid red" : this.state.value,
          }}
        />

        <label htmlFor="category">
          <small>Category</small>
        </label>
        <select id="dropdown" value={category} onChange={this.selectCategory}>
          <option value="amphibians">Amphibians</option>
          <option value="birds">Birds</option>
          <option value="fish">Fish</option>
          <option value="invertebrates">Invertebrates</option>
          <option value="mammals">Mammals</option>
          <option value="reptiles">Reptiles</option>
        </select>
        <button type="submit">Submit Edited Animal</button>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    editProduct: (product, productId) =>
      dispatch(editProduct(product, productId)),
  };
};

export default connect(mapState, mapDispatch)(EditProduct);
