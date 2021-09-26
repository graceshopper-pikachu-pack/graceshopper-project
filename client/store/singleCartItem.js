import axios from "axios";
import history from "../history";
import { getToken } from "./index";

let token;
/**
 * ACTION TYPES
 */

const CLEAR_CART_ITEM = "CLEAR_CART_ITEM";
const SET_CART_ITEM = "SET_CART_ITEM";
const EDIT_CART_ITEM = "EDIT_CART_ITEM";

/**
 * ACTION CREATORS
 */

export const setCartItem = (item) => ({
  type: SET_CART_ITEM,
  item,
});

export const clearCartItem = () => ({ type: CLEAR_CART_ITEM, item: {} });

export const editCartItem = (item) => ({ type: EDIT_CART_ITEM, item });

/**
 * THUNK CREATORS
 */

// FETCH CART ITEM:

export const fetchCartItem = (product) => {
  return async (dispatch) => {
    token = getToken();
    if (token) {
      dispatch(getDBCartItem(product));
    } else {
      dispatch(getLocalCartItem(product));
    }
  };
};

export const getDBCartItem = (product) => {
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
      if (cartItem.length) {
        dispatch(setCartItem(cartItem[0]));
      }
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

      // if the item we are looking at is in our cart
      if (cartCopy.length) {
        // put the cart on the redux store
        dispatch(setCartItem(cartCopy[0]));
      }
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
    case EDIT_CART_ITEM:
      const stateCopy = { ...state };
      stateCopy.quantity = action.item.quantity;
      return stateCopy;
    default:
      return state;
  }
}
