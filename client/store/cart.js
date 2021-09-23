import axios from "axios";
import history from "../history";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);
/**
 * ACTION TYPES
 */
const SET_CART = "SET_CART";
const EDIT_CART_ITEM = "EDIT_CART_ITEM";
const CLEAR_CART = "CLEAR_CART";

/**
 * ACTION CREATORS
 */
const setCart = (cart) => ({ type: SET_CART, cart });

const editCartItem = (item) => ({ type: EDIT_CART_ITEM, item });

export const clearCart = () => ({ type: CLEAR_CART, cart: [] });

/**
 * THUNK CREATORS
 */
export const fetchCart = () => {
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

        dispatch(editCartItem(response.data));
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

export const deleteCartItem = (cartItem) => {
  return async (dispatch) => {
    try {
      console.log(cartItem.cartItemId);
      const { data } = await axios.delete(
        `/api/cart/cartItem/delete/${cartItem.cartItemId}`,
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
      // set the new object as a local variable
      const localCartItem = { quantity: product.quantity, ...data };
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);
      // create a copy of the cart
      let cartCopy = [...localCart];

      // confirm local cart does not already contain local cart item
      let inCart = false;
      cartCopy.forEach((item) => {
        if (item.id === localCartItem.id) {
          inCart = true;
        }
      });

      // if the cartItem is already in the local cart
      if (inCart) {
        // increase the quantity by the added quantity
        cartCopy.map((item) => {
          if (item.id === localCartItem.id) {
            item.quantity =
              Number(item.quantity) + Number(localCartItem.quantity);
          }
        });
      } else {
        // add the newly created item to the cart
        cartCopy.push(localCartItem);
      }
      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteLocalCartItem = (product) => {
  return async (dispatch) => {
    try {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);

      // create a copy of the cart
      let cartCopy = [...localCart];

      // filter for the item we are deleting
      cartCopy = cartCopy.filter((item) => item.id !== product.cartItemId);

      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editLocalCartItem = (product) => {
  return async (dispatch) => {
    try {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);

      // create a copy of the cart
      let cartCopy = [...localCart];

      // map for the item we are editing
      cartCopy.map((item) => {
        if (item.id === product.cartItemId) {
          item.quantity = product.quantity;
        }
        return item;
      });

      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearLocalCart = () => {
  try {
    const emptyCart = JSON.stringify([]);
    window.localStorage.setItem("cart", emptyCart);
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
    case EDIT_CART_ITEM:
      const stateCopy = [...state];
      stateCopy.forEach((item) => {
        if (item.id === action.item.id) {
          item.quantity = action.item.quantity;
        }
      });
      console.log("stateCopy", stateCopy);
      return stateCopy;
    default:
      return state;
  }
}
