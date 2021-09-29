import React from 'react';

const Product = (props) => {
	const routeToProduct = () => {
		const route = `/products/${props.product.id}`;
		props.history.push(route);
	};

	const singleProduct = props.product;

	return (
		<div>
			<article>
				<img src={singleProduct.imageUrl} onClick={routeToProduct} className="img-products-list" />
				<div className="text">
					<h3>{singleProduct.productName.toUpperCase()}</h3>
					<h4>${singleProduct.price.toLocaleString()}.00</h4>
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
			</article>
		</div>
	);
};

export default Product;
