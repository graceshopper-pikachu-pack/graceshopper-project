import React from "react";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import { fetchOrders } from "../store";

/**
 * COMPONENT
 */
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      orders: [],
    };
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders !== this.props.orders) {
      this.setState({
        orders: this.props.orders,
      });
    }
  }

  render() {
    const orders = this.state.orders || [];

    return (
      <div>
        {!orders.length ? (
          <h4>You have no orders to display!</h4>
        ) : (
          <>
            {orders.map((item) => (
              <div className="order" key={item.orderId}>
                <h3 className="order-date">
                  Order Date: {item.orderDate.slice(0, 10)}
                </h3>
                <h3 className="order-total-price">
                  Subtotal: {item.totalPrice}
                </h3>
                {item.orderItems.map((orderItem) => (
                  <OrderItem
                    orderItem={orderItem}
                    key={orderItem.id}
                    history={this.props.history}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(mapState, mapDispatch)(UserPage);
