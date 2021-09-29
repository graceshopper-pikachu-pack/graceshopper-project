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
			<div class="single-product-body">
				{!singleProduct.id ? (
					<h4>Loading...</h4>
				) : (
					<div class="single-product-body">
						<header>
							<h1>{singleProduct.productName}</h1>
							<h2>Latin Name:{singleProduct.latinName}</h2>
							<h3>{singleProduct.category}</h3>
						</header>
						<div id="single-product-main">
							<aside>
								<h2>FUN FACTS</h2>
								    <h3>{singleProduct.funFact}</h3>
							</aside>
							<article>
								<div class="img-single-product">
									<img src={singleProduct.imageUrl} />
								</div>
								<h2>Minimal Donation Amount: ${singleProduct.price.toLocaleString()}.00</h2>
								<h3>{singleProduct.productDescription}</h3>

								{errors.quantity ? <h6 className="error">{errors.quantity}</h6> : null}
								<label htmlFor="quantity">
									<h4>Current Quantity:</h4>
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
							</article>
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
