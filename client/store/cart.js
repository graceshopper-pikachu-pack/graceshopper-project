import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_CART = "SET_CART";

/**
 * ACTION CREATORS
 */
const setCart = (cart) => ({ type: SET_CART, cart });

/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      const cart = data.cartItems.map((item) => {
        const { quantity } = item;
        return { quantity, ...item.product };
      });
      dispatch(setCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
