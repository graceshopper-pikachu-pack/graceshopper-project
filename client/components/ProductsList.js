import React from "react";
import { connect } from "react-redux";
import Product from "./Product";

const dummydata = [
  {
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
  },
  {
    id: 2,
    stockNumber: 2,
    productName: "bananas",
    productDescription:
      'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
    stockQuantity: 99,
    imageUrl:
      "https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg",
    price: 3.99,
    category: "fruit",
  },
  {
    id: 3,
    stockNumber: 3,
    productName: "oranges",
    productDescription:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange.",
    stockQuantity: 99,
    imageUrl:
      "https://cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg",
    price: 2.99,
    category: "fruit",
  },
];

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    // this.props.fetchProducts()
    this.setState({
      products: [...dummydata],
    });
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
      });
    }
  }

  render() {
    const products = this.state.products || [];
    return (
      <div>
        {!products.length ? (
          <h4>Loading...</h4>
        ) : (
          products.map((product) => (
            <Product product={product} key={product.id} />
          ))
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //TODO: write this store and method
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(ProductsList);
