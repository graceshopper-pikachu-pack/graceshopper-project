import axios from "axios";
import history from "../history";
import { clearReduxCart, addToUserCart, getToken } from "./index";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    // check if there is a cart on the local storage
    let localCart = window.localStorage.getItem("cart");
    localCart = JSON.parse(localCart);
    // if there is not, initialize a new empty cart
    if (!localCart) {
      window.localStorage.setItem("cart", JSON.stringify([]));
    }
    const token = getToken();
    if (token) {
      window.localStorage.removeItem("cart");
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });

      dispatch(addToUserCart(localCart));
      history.push("/home");
      return dispatch(setAuth(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = (formData, method) => async (dispatch) => {
  try {
    // if we log in, we want to remove the cart that may have been there
    const localCart = localStorage.getItem("cart");

    const res = await axios.post(`/auth/${method}`, formData);

    window.localStorage.setItem(TOKEN, res.data.token);

    dispatch(clearReduxCart());
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(TOKEN);
    // if we log out, we want to remove the cart that may have been there
    window.localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify([]));
    dispatch(clearReduxCart());
    dispatch(setAuth({}));
    history.push("/login");
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
