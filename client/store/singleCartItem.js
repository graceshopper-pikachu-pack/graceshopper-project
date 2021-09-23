import axios from "axios";
import history from "../history";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);
/**
 * ACTION TYPES
 */

const CLEAR_CART_ITEM = "CLEAR_CART_ITEM";
const SET_CART_ITEM = "SET_CART_ITEM";

/**
 * ACTION CREATORS
 */

const setCartItem = (item) => ({
  type: SET_CART_ITEM,
  item,
});

export const clearCartItem = () => ({ type: CLEAR_CART_ITEM, item: {} });

/**
 * THUNK CREATORS
 */
export const fetchCartItem = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/cartItems`, {
        headers: {
          authorization: token,
        },
      });

      const cart = data.cartItems.map((item) => {
        const { quantity, id } = item;
        return { quantity, cartItemId: id, ...item.product };
      });

      const cartItem = cart.filter(
        (item) => item.id === Number(product.productId)
      );

      dispatch(setCartItem(cartItem[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getLocalCartItem = (product) => {
  return async (dispatch) => {
    try {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);

      // create a copy of the cart
      let cartCopy = [...localCart];

      // filter for the item we are deleting
      cartCopy = cartCopy.filter(
        (item) => item.id === Number(product.productId)
      );

      // put the cart on the redux store
      dispatch(setCartItem(cartCopy[0]));
    } catch (error) {
      console.log(error);
    }
  };
};
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case CLEAR_CART_ITEM:
      return action.item;
    case SET_CART_ITEM:
      return action.item;
    default:
      return state;
  }
}
