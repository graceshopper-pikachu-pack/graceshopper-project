import React from "react";
import { connect } from "react-redux";
import AdminProduct from "./AdminProduct";
import {
  fetchProducts,
  filterByAll,
  filterByCategory,
  orderByName,
  orderByPriceAsc,
  orderByPriceDesc,
} from "../store";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredAndOrdered: [],
      category: "all",
      orderBy: "name",
      checkedState: [],
    };
    this.filterProducts = this.filterProducts.bind(this);
    this.orderProducts = this.orderProducts.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidMount() {
    this.props.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
      });
    }

    if (prevProps.filterAndOrder !== this.props.filterAndOrder) {
      this.setState({
        filteredAndOrdered: this.props.filterAndOrder,
      });
    }
  }

  filterProducts(evt) {
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
  }

  orderProducts(evt) {
    this.setState({
      orderBy: evt.target.value,
    });

    let products = this.state.filteredAndOrdered.length
      ? this.state.filteredAndOrdered
      : this.state.products;

    if (evt.target.value === "name") {
      this.props.orderByName(products);
    } else if (evt.target.value === "ascending-price") {
      this.props.orderByPriceAsc(products);
    } else if (evt.target.value === "descending-price") {
      this.props.orderByPriceDesc(products);
    }
  }

  handleChecked(productIdx) {
    const updatedCheckedState = this.state.checkedState.map((item, index) =>
      index === productIdx ? !item : item
    );

    this.setState({ checkedState: updatedCheckedState });
  }

  render() {
    let products = [];

    if (this.state.filteredAndOrdered.length) {
      products = this.state.filteredAndOrdered;
    } else {
      products = this.state.products;
    }

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
        <div className="column">
          <div className="row">
            <img
              className="admin-dashboard-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
            />
            <div className="admin-dashboard-name">Name:</div>
            <div className="admin-dashboard-stock-num">Stock Number:</div>
            <div className="admin-dashboard-price">Price:</div>
            <div className="admin-dashboard-stock">Stock Quantity:</div>
            <div className="admin-dashboard-category">Category:</div>
            <div className="admin-dashboard-date">Published:</div>
          </div>
          {products.map((product, index) => (
            <AdminProduct
              product={product}
              key={product.id}
              handleChecked={this.handleChecked}
            />
          ))}
        </div>
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
    getData: () => dispatch(fetchAdminData()),
    filterByAll: (products, orderBy) =>
      dispatch(filterByAll(products, orderBy)),
    filterByCategory: (products, orderBy, category) =>
      dispatch(filterByCategory(products, orderBy, category)),
    orderByName: (products) => dispatch(orderByName(products)),
    orderByPriceAsc: (products) => dispatch(orderByPriceAsc(products)),
    orderByPriceDesc: (products) => dispatch(orderByPriceDesc(products)),
  };
};

export default connect(mapState, mapDispatch)(AdminDashboard);
