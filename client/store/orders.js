import axios from "axios";
import history from "../history";
import { getToken } from "./index";

let token;

/**
 * ACTION TYPES
 */
const SET_ORDERS = "SET_ORDERS";

/**
 * ACTION CREATORS
 */
const setOrders = (orders) => ({ type: SET_ORDERS, orders });

/**
 * THUNK CREATORS
 */

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      token = getToken();
      const { data } = await axios.get(`/api/orders`, {
        headers: {
          authorization: token,
        },
      });

      let orders = [];
      data.forEach((order) => {
        let currentOrder = {};
        let orderItems = [];

        order.orderItems.map((item) => {
          let orderItem = {};
          const { quantity, id } = item;

          orderItem = {
            quantity,
            orderItemId: id,
            productId: item.product.id,
            ...item.product,
          };

          orderItems.push(orderItem);
        });

        currentOrder = {
          orderId: order.id,
          orderDate: order.createdAt,
          totalPrice: order.totalPrice,
          orderItems: [...orderItems],
        };

        orders.push(currentOrder);
      });

      dispatch(setOrders(orders));
    } catch (error) {
      console.log(error);
    }
  };
};

export const submitOrder = (order) => {
  return async (dispatch) => {
    try {
      console.log("order in store", order);
      token = getToken();

      const { data } = await axios.post(`/api/orders`, order, {
        headers: {
          authorization: token,
        },
      });
      console.log("order data in store", data);
    } catch (error) {}
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
