import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

/**
 * ACTION CREATORS
 */
const setSingleProduct = (singleProduct) => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct,
});

const clearSingleProduct = () => ({
  type: SET_SINGLE_PRODUCT,
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

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
}
