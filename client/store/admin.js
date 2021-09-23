import axios from "axios";

//types
const SET_ADMIN_DATA = "SET_ADMIN_DATA"
const initialState = {
    users: [],
    products: []

}


//creators
const set_admin_user_data = (users) => ({
    type: SET_ADMIN_DATA,
    users
})

const set_admin_products_data = (products) => ({
    type: SET_ADMIN_DATA,
    products
})

//thunks
export const fetchAdminUserData = () => {
    return async (dispatch) => {
        try {
            const {data}= await axios.get(`/api/users`);
            dispatch(set_admin_user_data(data))

        } catch (error){
            console.log(error)
        }
    }
}
export const fetchAdminProductData = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/products`);

            dispatch(set_admin_products_data(data))

        } catch(error){
            console.log(error)
        }
    }
}

//reducer

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_ADMIN_DATA:
            console.log("HERE ARE USERS",action.users)
            return {
                users: action.users,
                products: action.products
            };
        default:
            return state;
    }
}