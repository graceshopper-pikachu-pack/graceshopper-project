import axios from "axios";
import history from "../history";
import { updateDeletedProducts, getToken } from "./index";

let token;

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_EDITED_PRODUCTS_DISPLAY = "SET_EDITED_PRODUCTS_DISPLAY";

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });

export const setEditedProductsDisplay = (cartItem) => ({
  type: SET_EDITED_PRODUCTS_DISPLAY,
  cartItem,
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products`);

      dispatch(fetchProductsQuantity(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProductsQuantity = (product) => {
  return async (dispatch) => {
    token = getToken();
    if (token) {
      dispatch(fetchDBProductsQuantity(product));
    } else {
      dispatch(fetchLocalProductsQuantity(product));
    }
  };
};

export const fetchDBProductsQuantity = (products) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/cartItems`, {
        headers: {
          authorization: token,
        },
      });
      const cartItems = data.cartItems;

      products.forEach((product) => {
        cartItems.forEach((cartItem) => {
          if (cartItem.productId === product.id) {
            product.quantity = cartItem.quantity;
            product.cartItemId = cartItem.id;
          }
          return product;
        });
        if (!product.quantity) {
          product.quantity = 0;
        }
      });

      const editedProducts = [...products];
      dispatch(setProducts(editedProducts));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchLocalProductsQuantity = (products) => {
  return async (dispatch) => {
    try {
      let localCart = localStorage.getItem("cart");
      localCart = JSON.parse(localCart);
      let cartCopy = [...localCart];

      products.forEach((product) => {
        cartCopy.forEach((cartItem) => {
          if (cartItem.id === product.id) {
            product.quantity = cartItem.quantity;
          }
          return product;
        });
        if (!product.quantity) {
          product.quantity = 0;
        }
      });

      const editedProducts = [...products];
      dispatch(setProducts(editedProducts));
    } catch (error) {
      console.log(error);
    }
  };
};

export const bulkDelete = (productIdsArr) => {
  return async (dispatch) => {
    try {
      if (productIdsArr.length) {
        let deletedProducts = [];
        productIdsArr.forEach((productId) => {
          let response = axios.delete(`/api/products/${productId}`);
          if (response) {
            deletedProducts.push(productId);
          }
        });
        dispatch(updateDeletedProducts(deletedProducts));
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
    case SET_PRODUCTS:
      return action.products;
    case SET_EDITED_PRODUCTS_DISPLAY:
      let stateCopy = [...state];
      if (stateCopy.length) {
        stateCopy = stateCopy.map((item) => {
          if (item.id === action.cartItem.productId) {
            item.quantity = action.cartItem.quantity;
            item.cartItemId = action.cartItem.cartItemId;
          }
          return item;
        });
      }
      return stateCopy;
    default:
      return state;
  }
}
