/* global describe beforeEach it */

const { expect } = require('chai');
const {
	db,
	models: { User },
} = require('../../server/db');
const jwt = require('jsonwebtoken');
const seed = require('../../script/seed');

describe('User model', () => {
	let users;
	beforeEach(async () => {
		users = (await seed()).users;
	});

	describe('instanceMethods', () => {
		describe('generateToken', () => {
			it('returns a token with the id of the user', async () => {
				const token = await users.cody.generateToken();
				const { id } = await jwt.verify(token, process.env.JWT);
				expect(id).to.equal(users.cody.id);
			});
		}); // end describe('correctPassword')
		describe('authenticate', () => {
			let user;
			beforeEach(
				async () =>
					(user = await User.create({
						username: 'll2001',
						password: 'LucyLiuIsMe',
						firstName: 'Lucy',
						lastName: 'Liu',
						email: 'lucyliu@apia.com',
						adminStatus: false,
						address: '8037 Pine Road Orange Park, FL 32065',
					}))
			);
			describe('with correct credentials', () => {
				it('returns a token', async () => {
					const token = await User.authenticate({
						username: 'll2001',
						password: 'LucyLiuIsMe',
					});
					expect(token).to.be.ok;
				});
			});
			describe('with incorrect credentials', () => {
				it('throws a 401', async () => {
					try {
						await User.authenticate({
							username: 'lucy@gmail.com',
							password: '123',
						});
						throw 'nooo';
					} catch (ex) {
						expect(ex.status).to.equal(401);
					}
				});
			});
		}); // end describe('authenticate')
	}); // end describe('instanceMethods')
}); // end describe('User model')
