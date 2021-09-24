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

export const clearReduxCart = () => ({ type: CLEAR_CART, cart: [] });

/**
 * THUNK CREATORS
 */

// FETCH CART:
export const fetchCart = () => {
  return async (dispatch) => {
    if (token) {
      dispatch(fetchDBCart());
    } else {
      dispatch(fetchLocalCart());
    }
  };
};

export const fetchDBCart = () => {
  return async (dispatch) => {
    try {
      console.log("db cart fetched");
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

export const fetchLocalCart = () => {
  return async (dispatch) => {
    console.log("storage cart fetched");
    let localCart = localStorage.getItem("cart");
    // if there is a local cart on localStorage
    if (localCart) {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);
      // create a copy of the cart
      let cartCopy = [...localCart];
      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
    }
  };
};

// ADD TO CART:
export const incrementCartItem = (cartItem) => {
  return async (dispatch) => {
    // if there is a token on the local storage

    if (token) {
      // send to the logged in user route
      dispatch(incrementDBCart(cartItem));
    } else {
      // send to the guest route
      dispatch(incrementLocalCart(cartItem));
    }
  };
};

// adding to cart for logged in users
export const incrementDBCart = (cartItem) => {
  return async (dispatch) => {
    try {
      let response;
      if (cartItem.cartItemId) {
        response = await axios.put(
          `/api/cart/cartItem/increment/${cartItem.cartItemId}`,
          null,
          {
            headers: {
              authorization: token,
            },
          }
        );
      } else {
        const { data } = await axios.get(`/api/cart/id`, {
          headers: {
            authorization: token,
          },
        });

        response = await axios.post(
          `/api/cart/${data.id}`,
          { productId: cartItem.productId, quantity: 1 },
          {
            headers: {
              authorization: token,
            },
          }
        );
      }
      dispatch(editCartItem(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const incrementLocalCart = (cartItem) => {
  return async (dispatch) => {
    try {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);
      // create a copy of the cart
      let cartCopy = [...localCart];

      // if the cartItem is already in the local cart increase by one
      if (cartItem.quantity && cartItem.quantity !== 0) {
        cartCopy.map((item) => {
          if (item.id === cartItem.productId) {
            item.quantity += 1;
          }
        });
      } else {
        // else add the new item
        const { data } = await axios.get(`/api/products/${cartItem.productId}`);
        // set the new object as a local variable
        const localCartItem = { quantity: 1, ...data };
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

// DECREMENT CART:
export const decrementCartItem = (cartItem) => {
  return async (dispatch) => {
    // if there is a token on the local storage

    if (token) {
      // send to the logged in user route
      dispatch(decrementDBCart(cartItem));
    } else {
      // send to the guest route
      dispatch(decrementLocalCart(cartItem));
    }
  };
};

export const decrementDBCart = (cartItem) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/cart/cartItem/decrement/${cartItem.cartItemId}`,
        null,
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch(editCartItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const decrementLocalCart = (cartItem) => {
  return async (dispatch) => {
    try {
      if (cartItem.quantity) {
        // get the current cart from the local storage
        let localCart = localStorage.getItem("cart");
        // turn stringified cart into array of objects
        localCart = JSON.parse(localCart);
        // create a copy of the cart
        let cartCopy = [...localCart];

        cartCopy.map((item) => {
          if (item.id === cartItem.productId) {
            item.quantity -= 1;
          }
        });
        // overwrite the localstorage cart with the new cart
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        // put the new copy of the cart on the redux state
        dispatch(setCart(cartCopy));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// EDIT CART:
export const editCart = (product) => {
  return async (dispatch) => {
    if (token) {
      dispatch(editDBCart(product));
    } else {
      dispatch(editLocalCartItem(product));
    }
  };
};

export const editDBCart = (product) => {
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

export const editLocalCartItem = (product) => {
  return async (dispatch) => {
    try {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);

      // create a copy of the cart
      let cartCopy = [...localCart];

      let inCart = false;
      cartCopy.forEach((item) => {
        if (item.id === product.productId) {
          inCart = true;
        }
      });

      // if the cartItem is already in the local cart
      if (inCart) {
        // map for the item we are editing
        cartCopy.map((item) => {
          if (item.id === product.productId) {
            item.quantity = product.quantity;
          }
          return item;
        });
      } else {
        // find the product that matches from the server
        const { data } = await axios.get(`/api/products/${product.productId}`);
        // set the new object as a local variable
        const localCartItem = { quantity: product.quantity, ...data };
        // add the newly created item to the cart
        cartCopy.push(localCartItem);
      }
      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
      history.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };
};

// DELETE CART:
export const deleteCartItem = (cartItem) => {
  return async (dispatch) => {
    if (token) {
      dispatch(deleteDBCartItem(cartItem));
    } else {
      dispatch(deleteLocalCartItem(cartItem));
    }
  };
};

export const deleteDBCartItem = (cartItem) => {
  return async (dispatch) => {
    try {
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

export const deleteLocalCartItem = (cartItem) => {
  return async (dispatch) => {
    try {
      // get the current cart from the local storage
      let localCart = localStorage.getItem("cart");
      // turn stringified cart into array of objects
      localCart = JSON.parse(localCart);

      // create a copy of the cart
      let cartCopy = [...localCart];

      // filter for the item we are deleting
      cartCopy = cartCopy.filter((item) => item.id !== cartItem.productId);

      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state
      dispatch(setCart(cartCopy));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    if (token) {
      dispatch(clearDBCart());
    } else {
      dispatch(clearLocalCart());
    }
    dispatch(clearReduxCart());
  };
};

export const clearDBCart = () => {
  return async () => {
    try {
      const { data } = await axios.delete(`/api/cart/id`, {
        headers: {
          authorization: token,
        },
      });
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
      return stateCopy;
    default:
      return state;
  }
}
