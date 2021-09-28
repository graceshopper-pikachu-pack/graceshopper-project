import React from 'react';

const Product = (props) => {
	const routeToProduct = () => {
		const route = `/products/${props.product.id}`;
		props.history.push(route);
	};

	const singleProduct = props.product;

	return (
		<div className="row">
			<img src={singleProduct.imageUrl} onClick={routeToProduct} class="img-products-list" />
			<div className="column">
				<h2>{singleProduct.productName.toUpperCase()}</h2>
				<h4>${singleProduct.price.toLocaleString()}</h4>
				<h4>Quantity: {singleProduct.quantity}</h4>
				{singleProduct.errors ? <h6 className="error">{singleProduct.errors}</h6> : null}
				<button
					onClick={(evt) => {
						props.handleDecrement(singleProduct, evt);
					}}
				>
					Subtract from Cart
				</button>

				<button
					onClick={(evt) => {
						props.handleIncrement(singleProduct, evt);
					}}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default Product;
