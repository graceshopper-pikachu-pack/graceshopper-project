import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import admin from "./admin";
import auth from "./auth";
import singleProduct from "./singleProduct";
import products from "./products";
import cart from "./cart";
import orders from "./orders";
import singleCartItem from "./singleCartItem";
import filterAndOrder from "./filterAndOrder";

export const getToken = () => {
  const TOKEN = "token";
  const token = window.localStorage.getItem(TOKEN);
  return token;
};

const reducer = combineReducers({
  auth,
  products,
  singleProduct,
  cart,
  singleCartItem,
  filterAndOrder,
  admin,
  orders,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./singleProduct";
export * from "./products";
export * from "./cart";
export * from "./singleCartItem";
export * from "./filterAndOrder";
export * from "./admin";
export * from "./orders";
