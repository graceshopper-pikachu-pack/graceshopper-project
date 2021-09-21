import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct, clearSingleProduct } from "../store";

const dummydata = {
  id: 1,
  stockNumber: 1,
  productName: "apples",
  productDescription:
    "An apple is an edible fruit produced by an apple tree. Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today",
  stockQuantity: 99,
  imageUrl:
    "https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/apples_2.jpg?h=65b39431&itok=MoJheg5x",
  price: 4.99,
  category: "fruit",
};

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleProduct: {},
    };
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

  render() {
    const singleProduct = this.state.singleProduct || {};

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
              <h3>Category: {singleProduct.category}</h3>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    clearSingleProduct: () => dispatch(clearSingleProduct()),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
