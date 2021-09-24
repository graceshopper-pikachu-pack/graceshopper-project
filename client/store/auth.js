import axios from "axios";
import history from "../history";
import { clearReduxCart } from "./index";

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
  // check if there is a cart on the local storage
  const localCart = localStorage.getItem("cart");
  // if there is not, initialize a new empty cart
  if (!localCart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (formData, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, formData);
    // if we log in, we want to remove the cart that may have been there
    window.localStorage.removeItem("cart");
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
