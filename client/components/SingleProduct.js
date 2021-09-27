import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct, clearSingleProduct, editCart, fetchCartItem } from '../store';

class SingleProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			singleProduct: {},
			quantity: 0,
			cartItemId: '',
			errors: {
				quantity: '',
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount() {
		this.props.fetchSingleProduct(this.props.match.params.productId);

		// handles in the redux store for both guest and signed in
		this.props.fetchCartItem({
			productId: this.props.match.params.productId,
		});
	}

	componentWillUnmount() {
		this.props.clearSingleProduct();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.singleProduct !== this.props.singleProduct) {
			this.setState({
				singleProduct: this.props.singleProduct,
			});
		}
		if (prevProps.singleCartItem !== this.props.singleCartItem) {
			this.setState({
				quantity: this.props.singleCartItem.quantity,
				cartItemId: this.props.singleCartItem.id,
			});
		}
	}

	handleChange(evt) {
		// front-end error handling
		const { name, value } = evt.target;
		// make a copy of the state's errors
		let errors = this.state.errors;
		// error handling for valid quantity
		if (isNaN(value) || parseInt(value) !== Number(value) || value < 0) {
			errors.quantity = 'Please input a valid number';
		} else if (value > this.state.singleProduct.stockQuantity) {
			errors.quantity = 'Requested quantity in cart exceeds stock quantity';
		} else {
			errors.quantity = '';
		}

		// sets the copy of the error state we made with the changes we implemented through switch on the state

		this.setState({
			errors,
			[name]: value,
		});
	}

	handleEdit(evt) {
		evt.preventDefault();

		// if there are no errors in the quantity
		if (!this.state.errors.quantity) {
			this.props.editCart({
				productId: this.state.singleProduct.id,
				cartItemId: this.state.cartItemId,
				quantity: this.state.quantity,
			});
		}
	}

	render() {
		const singleProduct = this.state.singleProduct || {};
		const { quantity, errors } = this.state;

		return (
			<div>
				{!singleProduct.id ? (
					<h4>Loading...</h4>
				) : (
					<div id="single-product" className="column">
						<div id="single-product-detail" className="row">
							<img src={singleProduct.imageUrl} />
							<div className="mr1">
								<h2>Product Name: {singleProduct.productName}</h2>
								<h3>Price: {singleProduct.price}</h3>
								<h3>Product Description: {singleProduct.productDescription}</h3>

								<h4 style={{ color: 'red' }}>
									NOTE: can only add quantity currently, fix to either buttons or reduce quantity
								</h4>
								{errors.quantity ? <h6 className="error">{errors.quantity}</h6> : null}
								<label htmlFor="quantity">
									<small>Current Quantity:</small>
								</label>
								<input
									name="quantity"
									type="text"
									value={quantity}
									onChange={this.handleChange}
									style={{
										border: errors.quantity ? '2px solid red' : this.state.value,
									}}
								/>

								<button onClick={this.handleEdit}>Add to Cart</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		singleProduct: state.singleProduct,
		singleCartItem: state.singleCartItem,
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
		clearSingleProduct: () => dispatch(clearSingleProduct()),
		editCart: (product) => dispatch(editCart(product)),
		fetchCartItem: (productId) => dispatch(fetchCartItem(productId)),
	};
};

export default connect(mapState, mapDispatch)(SingleProduct);
