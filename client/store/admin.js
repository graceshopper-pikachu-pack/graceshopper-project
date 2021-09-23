import axios from "axios";

//types
const SET_ADMIN_DATA = "SET_ADMIN_DATA"
const initialState = {
    users: [],
    products: []

}


//creators
const set_admin_data = (users, products) => ({
    type: SET_ADMIN_DATA,
    users,
    products
})

// const set_admin_products_data = (products) => ({
//     type: SET_ADMIN_DATA,
//     products
// })

//thunks
export const fetchAdminData = () => {
    return async (dispatch) => {
        try {
            const {data:userData}= await axios.get(`/api/users`);

            const {data:productsData} = await axios.get(`/api/products`);

            dispatch(set_admin_data(userData, productsData))

        } catch (error){
            console.log(error)
        }
    }
}
// export const fetchAdminProductData = () => {
//     return async (dispatch) => {
//         try {


//             dispatch(set_admin_products_data(data))

//         } catch(error){
//             console.log(error)
//         }
//     }
// }

//reducer

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_ADMIN_DATA:

            return {
                users: action.users,

                products: action.products
            };
        default:
            return state;
    }
}