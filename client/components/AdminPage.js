import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchProducts} from "../store/products"
//next import from a file that doesn't exist yet, to show an administrator a list of all the users
// import {fetchUsers} from "../store/users"

class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            current: []
        }
        this.renderProductState = this.renderProductState.bind(this)
        //for users when I get to them
        //this.renderUserState = this.renderUserState.bind(this)

    }

    componentDidMount() {
        this.props.getAllProducts()
        //this.props.getAllUsers()
    }

    renderProductState() {
        this.setstate({current: this.props.products})
        this.forceUpdate()
    }

    //This next block can be uncommented after adding users to store
    // renderUserState() {
    //     this.setState({current:this.props.users})
    //     this.forceUpdate()
    // }
    render(){
        if (this.state.current.length < 1) {
            return (
                <div>
                    <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={()=> {
                        this.renderProductState()
                    }}>
                        Products
                    </button>{" "}
                    <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={()=> {
                        this.renderUserState()
                    }}>
                        Users
                    </button>
                </div>
            )
        }





    }
}

const mapState = state => {
    return {
        products: state.products,
        // users: state.user.users
    }
}

const mapDispatch = dispatch => {
    return {
        getAllProducts: () => dispatch(fetchProducts()),
        // getAllUsers: () => dispatch(fetchAllUsers())
    }
}

export default connect(mapState, mapDispatch)(Admin)