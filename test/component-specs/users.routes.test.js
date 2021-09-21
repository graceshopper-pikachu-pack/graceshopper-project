/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
	db,
	models: { User },
} = require('../../server/db');
const seed = require('../../script/seed');
const app = require('../../server/app');

describe('User routes', () => {
	let tina;
	let louise;
	let jimmy;

	beforeEach(async () => {
		const userData = [
			{
				firstName: 'Tina',
				lastName: 'Belcher',
				email: 'horsesRmajestic@unicorns.com',
				adminStatus: true,
				address: '354 Bobs Burgers Street',
			},
			{
				firstName: 'Louise',
				lastName: 'Belcher',
				email: 'worldDomination@muhaha.com',
				adminStatus: false,
				address: '354 Bobs Burgers Street',
			},
			{
				firstName: 'Jimmy Jr',
				lastName: 'Pesto',
				email: 'live2dance@stars.com',
				adminStatus: false,
				address: '357 Pizzeria Avenue',
			},
		];

		const createdUsers = await Promise.all(userData.map((data) => User.create(data)));

		tina = createdUsers[0];
		louise = createdUsers[1];
		jimmy = createdUsers[2];
	});

	describe('/api/users/', () => {
		it('GET /api/users', () => {
			return request(app)
				.get('/users')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect((res) => {
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.equal(5);
				});
		});

		it('POST /api/users', () => {
			return request(app)
				.post('/users')
				.send({
					firstName: 'Gene',
					lastName: 'Belcher',
					email: 'ilovemom@musiclover.com',
					adminStatus: false,
					address: '354 Bobs Burgers Street',
				})
				.expect(201)
				.expect('Content-Type', /json/)
				.expect((res) => {
					expect(res.body.firstName).to.equal('Gene');
				});
		});

		it('DELETE /api/users/:id', async () => {
			await request(app).delete(`/users/${louise.id}`).expect(204);
			const deletedUser = await User.findByPk(louise.id);
			expect(deletedUser).to.equal.null;
		});

		it('PUT /api/users/:id', () => {
			return request(app)
				.put(`/users/${tina.id}`)
				.send({ firstName: 'Linda' })
				.expect(200)
				.expect('Content-Type', /json/)
				.expect((res) => {
					expect(res.body.firstName).to.equal('Linda');
				});
		}); // end describe('/api/users')
	}); // end describe('User routes')
});
