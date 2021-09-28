import React from "react";
import { connect } from "react-redux";
import AdminProduct from "./AdminProduct";
import {
  fetchAdminData,
  filterByAll,
  filterByCategory,
  orderByName,
  orderByPriceAsc,
  orderByPriceDesc,
  bulkDelete,
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
      checkedProductIds: [],
    };
    this.filterProducts = this.filterProducts.bind(this);
    this.orderProducts = this.orderProducts.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.bulkDelete = this.bulkDelete.bind(this);
  }

  componentDidMount() {
    this.props.getData();
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

      const checkedState = new Array(this.props.filterAndOrder.length).fill(
        false
      );
      this.setState({
        checkedState: checkedState,
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

  handleChecked(productIdx, productId) {
    let updatedCheckedState = [...this.state.checkedState];
    updatedCheckedState = updatedCheckedState.map((item, index) => {
      if (index === productIdx) {
        item = !item;
      }
      return item;
    });

    let checkedProductIds = [...this.state.checkedProductIds];

    if (
      updatedCheckedState[productIdx] &&
      !checkedProductIds.includes(productId)
    ) {
      checkedProductIds = [productId, ...checkedProductIds];
    } else {
      const index = checkedProductIds.indexOf(productId);
      checkedProductIds.splice(index, 1);
    }

    this.setState({
      checkedState: updatedCheckedState,
      checkedProductIds: checkedProductIds,
    });
  }

  bulkDelete(evt) {
    evt.preventDefault();

    if (this.state.checkedProductIds.length) {
      this.props.bulkDelete(this.state.checkedProductIds);
    }
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
              <option value="AMPHIBIANS">Amphibians</option>
              <option value="BIRDS">Birds</option>
              <option value="FISH">Fish</option>
              <option value="INVERTEBRATES">Invertebrates</option>
              <option value="MAMMALS">Mammals</option>
              <option value="REPTILES">Reptiles</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={() => this.props.history.push("/admin/products/add")}
        >
          Add Animal
        </button>
        <button type="button" onClick={this.bulkDelete}>
          Delete Selected
        </button>
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
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.admin.products,
    // users: state.admin.users,
    filterAndOrder: state.filterAndOrder,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData: () => dispatch(fetchAdminData()),
    bulkDelete: (productIdsArr) => dispatch(bulkDelete(productIdsArr)),
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
