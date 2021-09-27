import axios from "axios";
import history from "../history";
import { getToken } from "./index";

let token;
/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const CLEAR_SINGLE_PRODUCT = "CLEAR_SINGLE_PRODUCT";

/**
 * ACTION CREATORS
 */
export const setSingleProduct = (singleProduct) => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct,
});

export const clearSingleProduct = () => ({
  type: CLEAR_SINGLE_PRODUCT,
  singleProduct: {},
});

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (product, productId) => {
  return async (dispatch) => {
    try {
      token = getToken();
      const { data } = await axios.put(`/api/products/${productId}`, product, {
        headers: {
          authorization: token,
        },
      });
      history.push(`/products/${productId}`);
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      token = getToken();
      const { data } = await axios.post(`/api/products`, product, {
        headers: {
          authorization: token,
        },
      });
      history.push(`/products/${data.id}`);
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
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    case CLEAR_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
}
