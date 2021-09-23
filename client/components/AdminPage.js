import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchAdminData} from "../store/admin"

class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            users: []
            // current: []
        }
        // this.renderProductState = this.renderProductState.bind(this)
        // this.renderUserState = this.renderUserState.bind(this)

    }

    componentDidMount() {
        console.log("It Mounts!")
        this.props.getData()
    }

    // renderProductState() {
    //     this.setstate({current: this.props.products})
    //     this.forceUpdate()
    // }

    renderUserState() {
        this.setState({current:this.props.users})
        this.forceUpdate()
    }

    render(){
        console.log("HERE ARE THE PROPS", this.props)
        // if (this.state.length < 1)
        {
            return (
                <div>
                    <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={()=> {
                        console.log("ONE", this.state.products)
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
        users: state.users
    }
}

const mapDispatch = dispatch => {
    return {
        getData: () => dispatch(fetchAdminData())
    }
}

export default connect(mapState, mapDispatch)(Admin)