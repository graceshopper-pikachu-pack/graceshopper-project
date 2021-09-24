import axios from 'axios';

//types
const SET_ADMIN_DATA = 'SET_ADMIN_DATA';
const EDIT_ADMIN_DATA = 'EDIT_ADMIN_DATA';

const initialState = {
  users: [],
  products: [],
};

//creators
const set_admin_data = (users, products) => ({
  type: SET_ADMIN_DATA,
  users,
  products,
});

const edit_admin_data = (products) => ({
  type: EDIT_ADMIN_DATA,
  products,
});

//thunks
export const fetchAdminData = () => {
  return async (dispatch) => {
    try {
      const { data: userData } = await axios.get(`/api/users`);

      const { data: productsData } = await axios.get(`/api/products`);

      dispatch(set_admin_data(userData, productsData));
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateAdminData = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(edit_admin_data(data));
    } catch (err) {
      console.log.log(err);
    }
  };
};

//reducer

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_DATA:
      return {
        users: action.users,
        products: action.products,
      };
    // case EDIT_ADMIN_DATA:
    //   return action.product;

    default:
      return state;
  }
}
