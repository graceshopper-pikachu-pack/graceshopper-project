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

const dummyData = [
  {
    id: 1,
    stockNumber: "SN-123-001",
    productName: "Shoebill Stork",
    imageUrl:
      "https://animals.sandiegozoo.org/sites/default/files/styles/image_grid_half_width/public/2019-09/shoebill03.jpg",
    productDescription:
      "You probably wouldn’t win a staring contest with it, though you’d be hard pressed to look away. Taller than a mailbox, with an eight-foot wingspan, the shoebill is quite a kick to observe! This hefty bird with its lesson-in-gray plumage is endemic to swamps and wetlands of Central and East Africa. Solitary in nature, even when paired with another, the birds like their space and will feed at opposite ends of their territory.",
    stockQuantity: 2,
    category: "birds",
    price: 800001,
  },
  {
    id: 2,
    stockNumber: "SN-123-002",
    productName: "Red Panda",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/erBglLkGU0eWF6c2PsEWHT2_TE0=/12x0:4907x3263/1400x1400/filters:focal(12x0:4907x3263):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49388585/16071828377_85109fdee4_o.0.0.jpg",
    productDescription:
      "The red panda cubs, like many of the zoo’s other animals, were named to honor the land that they are native to. Red pandas are indigenous to the Himalayan mountain region that includes parts of Nepal, Myanmar, China and northern regions of India. “Zeya” is derived from the Burmese language, which is the official language of Myanmar. “Ila” can be translated as “earth” and comes from the ancient Sanskrit language from which many modern languages spoken in India are derived.",
    stockQuantity: 5,
    category: "mammals",
    price: 800002,
  },
  {
    id: 3,
    stockNumber: "SN-123-003",
    productName: "Oriental Small-clawed Otter",
    imageUrl:
      "https://critter.science/wp-content/uploads/2021/02/asco1-1180x520.jpg",
    productDescription:
      "Asian small-clawed otters are the smallest of all 13 otter species and are native to Asia. Well adapted to life in the water, these social, intelligent animals spend a majority of their time on land.",
    stockQuantity: 7,
    category: "mammals",
    price: 800003,
  },
  {
    id: 4,
    stockNumber: "SN-123-004",
    productName: "Mandarin Duck",
    imageUrl:
      "https://pyxis.nymag.com/v1/imgs/6aa/326/8227a769871ef982b00bf715b101e5d961-6-hot-duck-b.rsocial.w1200.jpg",
    productDescription:
      'Small exotic-looking duck found at lakes and parks, usually with nearby trees. Male very ornate with big orangey "sail fins" on the back, streaked orangey cheeks, and a small red bill with a whitish tip. Female has narrow white spectacles on shaggy gray head, bold pale dappled spots along flanks, and pale bill tip. Mainly found in pairs or singly, but will gather in larger flocks over the winter; perches readily in trees over water. Native to East Asia, but has established feral populations throughout Western Europe.',
    stockQuantity: 8,
    category: "birds",
    price: 800004,
  },
  {
    stockNumber: "SN-123-005",
    productName: "Ring-tail Lemur",
    imageUrl:
      "https://nationalzoo.si.edu/sites/default/files/animals/20110407-071mm.jpg",
    productDescription:
      "Ring-tailed lemurs are named for the 13 alternating black and white bands that adorn their tails. Unlike most other lemurs, ringtails spend 40 percent of their time on the ground, moving quadrupedally along the forest floor.",
    stockQuantity: 3,
    category: "mammals",
    price: 800005,
  },
  {
    stockNumber: "SN-123-006",
    productName: "Axolotl",
    imageUrl:
      "https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg",
    productDescription:
      "Shrouded in mystery, and defying typical biological laws like metamorphosis, the axolotl (pronounced AX-oh-lot-ul), a type of salamander, keeps its webbed feet firmly placed in infancy throughout its life. Unlike other salamanders, axolotls are neotenic, meaning they keep juvenile characteristics into adulthood. The axolotl remains aquatic (like larvae) their entire life.Though  vaguely reminiscent of primates, they are actually most closely related to anteaters and armadillos.",
    stockQuantity: 7,
    category: "amphibians",
    price: 800006,
  },
  {
    stockNumber: "SN-123-007",
    productName: "Aldabra Tortoise",
    imageUrl:
      "https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/aldabratortoise-003.jpg",
    productDescription: `Aldabra tortoises are easily domesticated and can learn to identify their keepers in a short time. Aldabras are one of the world's largest land tortoises. Males are considerably larger than females and have longer, thicker tails.`,
    stockQuantity: 2,
    category: "reptiles",
    price: 800007,
  },
];

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
    this.props.fetchProducts();
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
    fetchProducts: () => dispatch(fetchProducts()),
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
