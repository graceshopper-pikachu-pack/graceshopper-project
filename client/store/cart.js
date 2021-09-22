import axios from "axios";
import history from "../history";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);
/**
 * ACTION TYPES
 */
const SET_CART = "SET_CART";
const CLEAR_CART = "CLEAR_CART";
const SET_CART_ITEM = "SET_CART_ITEM";

/**
 * ACTION CREATORS
 */
const setCart = (cart) => ({ type: SET_CART, cart });

const setCartItem = (cartItem) => ({
  type: SET_CART_ITEM,
  cartItem,
});

export const clearCart = () => ({ type: CLEAR_CART, cart: [] });

/**
 * THUNK CREATORS
 */
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      console.log("banana");
      const { data } = await axios.get(`/api/cart/cartItems`, {
        headers: {
          authorization: token,
        },
      });

      const cart = data.cartItems.map((item) => {
        const { quantity, id } = item;
        return { quantity, cartItemId: id, ...item.product };
      });
      dispatch(setCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

// adding to cart for logged in users
export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      // find cart associated with user by the id on the token
      // returns an object containing the cart with an array of cartItems, each with their associated product
      const { data } = await axios.get(`/api/cart/cartItems`, {
        headers: {
          authorization: token,
        },
      });

      // the filter below checks whether the product we are trying to add is already in the cart
      // if the product is in the cart, it returns that item, otherwise productInCart is an empty array
      const productInCart = data.cartItems.filter((item) => {
        if (item.product.id === product.productId) {
          return item;
        }
      });

      let response;
      // if the product you are trying to add is already in the cart
      if (productInCart.length) {
        // set the cartItemId
        let cartItemId = productInCart[0].id;
        // send put request to increase quantity of products
        response = await axios.put(
          `/api/cart/cartItem/add/${cartItemId}`,
          product,
          {
            headers: {
              authorization: token,
            },
          }
        );
      } else {
        // if it is not already in the cart
        // set the cartId to the cartId returned from the get req
        const cartId = data.id;

        // create cart item and add to cart
        response = await axios.post(`/api/cart/${cartId}`, product, {
          headers: {
            authorization: token,
          },
        });
        // set the returned cartItem on the state
        // do we need to have this?
        dispatch(setCartItem(response.data));
      }
      history.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };
};

export const editCart = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/cart/cartItem/edit/${product.cartItemId}`,
        product,
        {
          headers: {
            authorization: token,
          },
        }
      );
      history.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToLocalCart = (product) => {
  return async (dispatch) => {
    try {
      // find the product that matches from the server
      const { data } = await axios.get(`/api/products/${product.productId}`);
      // add the quantity to the product
      const localCartItem = { quantity: product.quantity, ...data };

      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);
      // create a copy of the cart
      let cartCopy = [...localCart];
      // add the newly created item to the cart
      cartCopy.push(localCartItem);
      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getLocalCart = () => {
  try {
    // get the current cart from the local storage
    let localCart = localStorage.getItem("cart");
    // turn stringified cart into array of objects
    localCart = JSON.parse(localCart);
    // put the cart on the redux store
    dispatch(setCart(localCart));
  } catch (error) {
    console.log(error);
  }
};

export const clearLocalCart = () => {
  try {
    localStorage.setItem("cart", JSON.stringify([]));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case CLEAR_CART:
      return action.cart;
    case SET_CART_ITEM:
      return [action.cartItem, ...state];
    default:
      return state;
  }
}
