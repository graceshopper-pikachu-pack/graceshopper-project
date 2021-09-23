/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');

const app = require('../../server/app');
const agent = request.agent(app);

const {
	db,
	models: { User },
} = require('../../server/db');
//const seed = require('../../script/seed');

describe('User Routes', () => {
	beforeEach(async () => {
		console.log('About to sync db - will wipe out db!');
		await db.sync({ force: true });
	});

	describe('User routes', () => {
		let tina;
		let louise;
		let jimmy;

		beforeEach(async () => {
			console.log('User route');
			const userData = [
				{
					username: 'tbelcher',
					password: 'ilovepestoboy',
					firstName: 'Tina',
					lastName: 'Belcher',
					email: 'horsesRmajestic@unicorns.com',
					adminStatus: true,
					address: '354 Bobs Burgers Street',
				},
				{
					username: 'lbelcher',
					firstName: 'Louise',
					lastName: 'Belcher',
					email: 'worldDomination@muhaha.com',
					adminStatus: false,
					address: '354 Bobs Burgers Street',
				},
				{
					username: 'jjr',
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

		describe('api/users/', () => {
			xit('GET /api/users', () => {
				return agent
					.get('/api/users')
					.expect('Content-Type', /json/)
					.expect(200)
					.expect((res) => {
						expect(res.body).to.be.an.instanceOf(Array);
						expect(res.body.length).to.equal(3);
					});
			});

			it('POST /api/users', () => {
				return agent
					.post('/api/users')
					.send({
						username: 'gbelcher',
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

			xit('DELETE /api/users/:id', async () => {
				await agent.delete(`/api/users/${louise.id}`).expect(204);
				const deletedUser = await User.findByPk(louise.id);
				expect(deletedUser).to.equal(null);
			});

			it('PUT /api/users/:id', () => {
				return agent
					.put(`/api/users/${louise.id}`)
					.send({ adminStatus: true })
					.expect(200)
					.expect('Content-Type', /json/)
					.expect((res) => {
						expect(res.body.adminStatus).to.equal(true);
					});
			}); // end describe('/api/users')
		}); // end describe('User routes')
	});
});
