import React from "react";
import { connect } from "react-redux";
import Product from "./Product";
import {
  fetchProducts,
  filterByAll,
  filterByCategory,
  orderByName,
  orderByPriceAsc,
  orderByPriceDesc,
  incrementCartItem,
  decrementCartItem,
} from "../store";

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredAndOrdered: [],
      products: [],
      category: "all",
      orderBy: "name",
    };
    this.filterProducts = this.filterProducts.bind(this);
    this.orderProducts = this.orderProducts.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
      });
      this.filterProducts();
    }

    if (prevProps.filterAndOrder !== this.props.filterAndOrder) {
      this.setState({
        filteredAndOrdered: this.props.filterAndOrder,
      });
    }
  }

  filterProducts(evt) {
    if (evt) {
      this.setState({
        category: evt.target.value,
      });

      if (evt.target.value === "all") {
        this.props.filterByAll(this.state.products, this.state.orderBy);
      } else {
        this.props.filterByCategory(
          this.state.products,
          this.state.orderBy,
          evt.target.value
        );
      }
    } else {
      if (this.state.category === "all") {
        this.props.filterByAll(this.props.products, this.state.orderBy);
      } else {
        this.props.filterByCategory(
          this.props.products,
          this.state.orderBy,
          this.state.category
        );
      }
    }
  }

  orderProducts(evt) {
    this.setState({
      orderBy: evt.target.value,
    });

    let products = this.state.filteredAndOrdered;

    if (evt.target.value === "name") {
      this.props.orderByName(products);
    } else if (evt.target.value === "ascending-price") {
      this.props.orderByPriceAsc(products);
    } else if (evt.target.value === "descending-price") {
      this.props.orderByPriceDesc(products);
    }
  }

  handleIncrement(product, evt) {
    evt.preventDefault();

    let cartItem;
    const updatedItems = this.state.filteredAndOrdered.map((item) => {
      if (item.id === product.id) {
        if (item.quantity + 1 > item.stockQuantity) {
          item.errors = "Requested quantity in cart exceeds stock quantity";
        } else {
          item.errors = "";
        }
        cartItem = { ...item };
      }

      return item;
    });

    this.setState({
      filterAndOrder: [...updatedItems],
    });

    // if there are no errors in the quantity
    if (!cartItem.errors) {
      this.props.incrementCartItem({
        productId: cartItem.id,
        cartItemId: cartItem.cartItemId,
        quantity: cartItem.quantity,
        stockQuantity: cartItem.stockQuantity,
      });
    }
  }

  handleDecrement(product, evt) {
    evt.preventDefault();

    let cartItem;
    const updatedItems = this.state.filteredAndOrdered.map((item) => {
      if (item.id === product.id) {
        if (item.quantity - 1 < 0) {
          item.errors = "This item is not in your cart!";
        } else {
          item.errors = "";
        }
        cartItem = { ...item };
      }

      return item;
    });

    this.setState({
      filterAndOrder: [...updatedItems],
    });

    // if there are no errors in the quantity
    if (!cartItem.errors) {
      this.props.decrementCartItem({
        productId: cartItem.id,
        cartItemId: cartItem.cartItemId,
        quantity: cartItem.quantity,
      });
    }
  }

  render() {
    let products = this.state.filteredAndOrdered.length
      ? this.state.filteredAndOrdered
      : [];

    if (!products.length) {
      return <h4>Loading...</h4>;
    }

    return (
      <div>
        <div>
          <div>
            <label>Order By: </label>
            <select
              id="dropdown"
              value={this.state.orderBy}
              onChange={this.orderProducts}
            >
              <option value="name">Name</option>
              <option value="ascending-price">Price Ascending</option>
              <option value="descending-price">Price Descending</option>
            </select>
          </div>
          <div>
            <label>Filter By: </label>
            <select
              id="dropdown"
              value={this.state.category}
              // when the value changes call the method
              onChange={this.filterProducts}
            >
              <option value="all">All Animals</option>
              <option value="amphibians">Amphibians</option>
              <option value="birds">Birds</option>
              <option value="fish">Fish</option>
              <option value="invertebrates">Invertebrates</option>
              <option value="mammals">Mammals</option>
              <option value="reptiles">Reptiles</option>
            </select>
          </div>
        </div>
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            history={this.props.history}
            handleIncrement={this.handleIncrement}
            handleDecrement={this.handleDecrement}
          />
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    filterAndOrder: state.filterAndOrder,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    filterByAll: (products, orderBy) =>
      dispatch(filterByAll(products, orderBy)),
    filterByCategory: (products, orderBy, category) =>
      dispatch(filterByCategory(products, orderBy, category)),
    orderByName: (products) => dispatch(orderByName(products)),
    orderByPriceAsc: (products) => dispatch(orderByPriceAsc(products)),
    orderByPriceDesc: (products) => dispatch(orderByPriceDesc(products)),
    incrementCartItem: (cartItem) => dispatch(incrementCartItem(cartItem)),
    decrementCartItem: (cartItem) => dispatch(decrementCartItem(cartItem)),
  };
};

export default connect(mapState, mapDispatch)(ProductsList);
