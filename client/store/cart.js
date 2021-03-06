import axios from "axios";
import history from "../history";
import { setEditedProductsDisplay, getToken } from "./index";

let token;

/**
 * ACTION TYPES
 */
const SET_CART = "SET_CART";
const SET_EDITED_CART = "SET_EDITED_CART";
const SET_DELETED_CART_ITEM = "SET_DELETED_CART_ITEM";
const CLEAR_CART = "CLEAR_CART";

/**
 * ACTION CREATORS
 */
export const setCart = (cart) => ({ type: SET_CART, cart });

const setEditedCart = (cartItem) => ({ type: SET_EDITED_CART, cartItem });

export const setDeletedCartItem = (cartItem) => ({
  type: SET_DELETED_CART_ITEM,
  cartItem,
});

export const clearReduxCart = () => ({ type: CLEAR_CART, cart: [] });

/**
 * THUNK CREATORS
 */

// FETCH CART:
export const fetchCart = () => {
  return async (dispatch) => {
    token = getToken();

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
      const { data } = await axios.get(`/api/cart/cartItem`, {
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
    token = getToken();

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
      if (cartItem.quantity > 0) {
        response = await axios.put(
          `/api/cart/cartItem/increment/${cartItem.cartItemId}`,
          cartItem,
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
        response.data = { cartItemId: response.data.id, ...response.data };
      }

      const newItem = { cartItemId: response.data.id, ...response.data };

      dispatch(setEditedProductsDisplay(newItem));
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
      let localCartItem;

      // if the cartItem is already in the local cart increase by one
      if (cartItem.quantity && cartItem.quantity !== 0) {
        cartCopy.map((item) => {
          if (item.id === cartItem.productId) {
            item.quantity += 1;
            localCartItem = item;
          }
        });
      } else {
        // else add the new item
        const { data } = await axios.get(`/api/products/${cartItem.productId}`);
        // set the new object as a local variable
        let productId = data.id;
        localCartItem = { quantity: 1, productId: productId, ...data };
        // add the newly created item to the cart

        cartCopy.push(localCartItem);
      }
      // overwrite the localstorage cart with the new cart
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      // put the new copy of the cart on the redux state

      dispatch(setEditedProductsDisplay(localCartItem));
    } catch (error) {
      console.log(error);
    }
  };
};

// DECREMENT CART:
export const decrementCartItem = (cartItem) => {
  return async (dispatch) => {
    // if there is a token on the local storage
    token = getToken();
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
      if (cartItem.quantity - 1 >= 0) {
        const { data } = await axios.put(
          `/api/cart/cartItem/decrement/${cartItem.cartItemId}`,
          null,
          {
            headers: {
              authorization: token,
            },
          }
        );

        const newItem = { cartItemId: data.id, ...data };
        dispatch(setEditedProductsDisplay(newItem));

        if (cartItem.quantity - 1 === 0) {
          dispatch(deleteDBCartItem(cartItem));
        }
      }
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

        let localCartItem;

        cartCopy.map((item) => {
          if (item.id === cartItem.productId) {
            item.quantity -= 1;
            localCartItem = item;
          }
        });

        if (cartItem.quantity - 1 === 0) {
          cartCopy = cartCopy.filter((item) => item.id !== cartItem.productId);
        }

        // overwrite the localstorage cart with the new cart
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        // put the new copy of the cart on the redux state
        dispatch(setEditedProductsDisplay(localCartItem));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// EDIT CART:
export const editCart = (product) => {
  return async (dispatch) => {
    token = getToken();
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
      if (Number(product.quantity) === 0) {
        dispatch(deleteDBCartItem(product));
      } else if (product.cartItemId) {
        // check if the item exists in the cart
        token = getToken();
        const { data } = await axios.put(
          `/api/cart/cartItem/edit/${product.cartItemId}`,
          product,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(setEditedCart(data[1][0]));
        history.push("/cart");
      } else {
        let response = await axios.get(`/api/cart/id`, {
          headers: {
            authorization: token,
          },
        });

        response = await axios.post(
          `/api/cart/${response.data.id}`,
          { productId: product.productId, quantity: product.quantity },
          {
            headers: {
              authorization: token,
            },
          }
        );

        history.push("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editLocalCartItem = (product) => {
  return async (dispatch) => {
    try {
      if (Number(product.quantity) === 0) {
        dispatch(deleteLocalCartItem(product));
      } else {
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
          const { data } = await axios.get(
            `/api/products/${product.productId}`
          );
          // set the new object as a local variable
          const localCartItem = { quantity: product.quantity, ...data };
          // add the newly created item to the cart
          cartCopy.push(localCartItem);
        }
        // overwrite the localstorage cart with the new cart
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        // put the new copy of the cart on the redux state
        dispatch(setCart(cartCopy));
      }
      history.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };
};

// DELETE CART:
export const deleteCartItem = (cartItem) => {
  return async (dispatch) => {
    token = getToken();
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

      dispatch(setDeletedCartItem(data));
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

export const clearCart = () => {
  return async (dispatch) => {
    token = getToken();

    if (token) {
      dispatch(clearDBCart());
    } else {
      clearLocalCart();
    }
    dispatch(clearReduxCart());
  };
};

export const addToUserCart = (localCart) => {
  return async () => {
    try {
      if (localCart && localCart.length) {
        let cartCopy = [...localCart];
        token = getToken();

        const { data } = await axios.get(`/api/cart/cartItems`, {
          headers: {
            authorization: token,
          },
        });

        // if there are items in the cart
        if (data.cartItems.length) {
          for (let i = 0; i < cartCopy.length; i++) {
            for (let j = 0; j < data.cartItems.length; j++) {
              if (cartCopy[i].productId === data.cartItems[j].productId) {
                await axios.put(
                  `/api/cart/cartItem/incrementBy/${data.cartItems[j].id}`,
                  { quantity: cartCopy[i].quantity },
                  {
                    headers: {
                      authorization: token,
                    },
                  }
                );
                break;
              } else if (j + 1 === data.cartItems.length) {
                await axios.post(
                  `/api/cart/${data.id}`,
                  {
                    productId: cartCopy[i].productId,
                    quantity: cartCopy[i].quantity,
                  },
                  {
                    headers: {
                      authorization: token,
                    },
                  }
                );
              }
            }
          }
        } else {
          // else if it is a completely empty cart
          for (let i = 0; i < cartCopy.length; i++) {
            await axios.post(
              `/api/cart/${data.id}`,
              {
                productId: cartCopy[i].productId,
                quantity: cartCopy[i].quantity,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            );
          }
        }
      }
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
    case CLEAR_CART:
      return action.cart;
    case SET_EDITED_CART:
      let stateCopy = [...state];
      if (stateCopy.length) {
        stateCopy = stateCopy.map((item) => {
          if (item.id === action.cartItem.productId) {
            item.quantity = action.cartItem.quantity;
          }
          return item;
        });
      }
      return stateCopy;
    case SET_DELETED_CART_ITEM:
      let deletedStateCopy = [...state];
      if (deletedStateCopy.length) {
        deletedStateCopy = deletedStateCopy.filter(
          (item) => item.id !== action.cartItem.productId
        );
      }
      return deletedStateCopy;
    default:
      return state;
  }
}
