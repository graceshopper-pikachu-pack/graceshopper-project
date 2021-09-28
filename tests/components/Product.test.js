/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
	users: [],
};

/* UnconnectedProducts and img src wrappers
 */

import mockAxios from './component-specs/mock-axios';
import { setProducts, fetchProducts } from '../../client/store/products';

import productsReducer from '../../client/store/products';
import { createStore } from 'redux';

const app = require('../../server/app');
const agent = require('supertest')(app);

const db = require('../../server/db/db');

const seed = require('../../script/seed');

// NOTE: Make sure you pay attention to the path below. This is where your React components should live!
// ProductsList is the default export from that module, and it is connected to Redux.

import ProductsList, {
	ProductsList as UnconnectedProductsList,
} from '../../client/components/Product';
import Routes from '../../client/Routes';
import Product from '../../client/components/Product';

describe('Tier One: Products', () => {
	// We'll use this array of products as dummy data for testing purposes
	const products = [
		{
			id: 1,
			stockNumber: 1,
			productName: 'apples',
			productDescription:
				'An apple is an edible fruit produced by an apple tree. Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today',
			stockQuantity: 99,
			imageUrl:
				'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/apples_2.jpg?h=65b39431&itok=MoJheg5x',
			price: 4.99,
			category: 'fruit',
		},
	];
	beforeEach(() => {

		mockAxios.onGet('/api/products').replyOnce(200, products);
	});
	describe('<ProductsList /> component', () => {
		const getProductsSpy = sinon.spy();
		afterEach(() => {
			getProductsSpy.resetHistory();
		});


		xit('renders the products passed in as props', () => {
			const wrapper = mount(
				<UnconnectedProductsList products={products} getProducts={getProductsSpy} />
			);
			expect(wrapper.text()).to.include('apples');
			expect(wrapper.text()).to.include('fruit');
			// The test is expecting an image for each product, with src set to the
			// product's imageUrl - the tag HAS TO BE an img src, NOT h1 or span

		});

		xit('renders DIFFERENT products passed in as props', () => {
			const differentProducts = [
				{
					id: 2,
					stockNumber: 2,
					productName: 'bananas',
					productDescription:
						'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
					stockQuantity: 99,
					imageUrl: 'https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg',
					price: 3.99,
					category: 'fruit',
				},
				{
					id: 3,
					stockNumber: 3,
					productName: 'oranges',
					productDescription:
						'The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange.',
					stockQuantity: 99,
					imageUrl:
						'https://cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg',
					price: 2.99,
					category: 'fruit',
				},
			];
			const wrapper = mount(
				<ProductsList products={differentProducts} getProducts={getProductsSpy} />
			);
			expect(wrapper.text()).to.not.include('apples');
			expect(wrapper.text()).to.include('bananas');
			expect(wrapper.text()).to.include('oranges');
			// The test is expecting an image for each product, with src set to the
			// product's imageUrl

		});


		xit('calls this.props.getProducts after mount', async () => {
			mount(<UnconnectedProductsList products={products} getProducts={getProductsSpy} />);
			await waitForExpect(() => {
				expect(getProductsSpy).to.have.been.called;
			});
		});
	});

	describe('Redux', () => {
		let fakeStore;
		beforeEach(() => {
			fakeStore = mockStore(initialState);
		});

		describe('set/fetch products', () => {
			xit('setProducts action creator returns a valid action', () => {
				expect(setProducts(products)).to.deep.equal({
					type: 'SET_PRODUCTS',
					products,
				});
			});

			xit('fetchProducts thunk creator returns a thunk that GETs /api/products', async () => {
				await fakeStore.dispatch(fetchProducts());
				const [getRequest] = mockAxios.history.get;
				expect(getRequest).to.not.equal(undefined);
				expect(getRequest.url).to.equal('/api/products');
				const actions = fakeStore.getActions();
				expect(actions[0].type).to.equal('SET_PRODUCTS');
				expect(actions[0].products).to.deep.equal(products);
			});
		});

		describe('reducer', () => {
			let testStore;
			beforeEach(() => {
				testStore = createStore(productsReducer);
			});

			xit('*** returns the initial state by default', () => {
				throw new Error('replace this error with your own test');
			});

			xit('reduces on SET_PRODUCTS action', () => {
				const action = { type: 'SET_PRODUCTS', products };

				const prevState = testStore.getState();
				testStore.dispatch(action);
				const newState = testStore.getState();

				expect(newState.products).to.be.deep.equal(products);
				expect(newState.products).to.not.be.equal(prevState.products);
			});
		});
	});

	describe('Connect: react-redux', () => {
		// This test is expecting your component to dispatch a thunk after it mounts

		it('initializes products from the server when the application loads the /products route', async () => {
			const reduxStateBeforeMount = store.getState();
			expect(reduxStateBeforeMount.products).to.deep.equal([]);
			mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/products']}>
						<ProductsList />
					</MemoryRouter>
				</Provider>
			);
			await waitForExpect(() => {
				const reduxStateAfterMount = store.getState();
				expect(reduxStateAfterMount.products).to.deep.equal(products);
			});
		});

		// This test is expecting your component to render the campuses from the

		it('<ProductsList /> renders products from the Redux store', async () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/products']}>
						<ProductsList />
					</MemoryRouter>
				</Provider>
			);
			await waitForExpect(() => {
				wrapper.update();

				const { products: reduxProducts } = store.getState();
				reduxProducts.forEach((reduxProduct) => {
					expect(wrapper.text()).to.include(reduxProducts.productName);
				});
			});
		});
	});

	describe('Navigation', () => {
		beforeEach(() => {
			sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
				return <div>{children}</div>;
			});
		});
		afterEach(() => {
			rrd.BrowserRouter.restore();
		});

		// This test expects that you've set up a Route for ProductsList.

		it('renders <ProductsList /> at /products', () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/products']}>
						<Routes />
					</MemoryRouter>
				</Provider>
			);
			expect(wrapper.find(ProductsList)).to.have.length(1);
			expect(wrapper.find(AllStudents)).to.have.length(0);
		});

		xit('*** navbar has links to "/products" and "/" (homepage)', () => {
			throw new Error('replace this error with your own test');
		});
	});

	describe('Express API', () => {
		// Testing our Express routes WITHOUT actually using the database.

		const { findAll: productsFindAll } = Product;
		beforeEach(() => {
			Product.findAll = sinon.spy(() => products);
		});
		afterEach(() => {
			Product.findAll = productsFindAll;
		});

		it('GET /api/products responds with all products', async () => {
			const response = await agent.get('/api/products').expect(200);
			expect(response.body).to.deep.equal([
				{
					id: 2,
					stockNumber: 2,
					productName: 'bananas',
					productDescription:
						'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
					stockQuantity: 99,
					imageUrl: 'https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg',
					price: 3.99,
					category: 'fruit',
				},
				{
					id: 3,
					stockNumber: 3,
					productName: 'oranges',
					productDescription:
						'The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange.',
					stockQuantity: 99,
					imageUrl:
						'https://cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg',
					price: 2.99,
					category: 'fruit',
				},
			]);
			expect(Product.findAll.calledOnce).to.be.equal(true);
		});
	});
});
