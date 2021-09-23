const { expect } = require('chai');
const { db } = require('../../server/db');
const { Product, User, Cart, Order } = require('../../server/db');

describe.only('Orders >- User Association', () => {
	before(() => db.sync({ force: true }));
	afterEach(() => db.sync({ force: true }));

	describe('Sequelize Models', () => {
		let user1, order1, order2;
		beforeEach(async () => {
			user1 = await User.create({
				firstName: 'Suzanne',
				lastName: 'Wong',
				email: 'suzanne@ghp.com',
				address: '8037 Pine Road Orange Park, FL 32065',
				password: 'blueorange3',
				username: 'swong',
				adminStatus: false,
			});
			order1 = await Order.create({
				id: user1.id,
				status: 'shipped',
			});
			order2 = await Order.create({
				id: user1.id,
				status: 'pending',
			});
		});
		afterEach(() => db.sync({ force: true }));

		it('a user may have many orders', async () => {
			const result = await user1.hasOrders([order1, order2]);
			expect(result).to.be.equal(true);
		});
	});
});
