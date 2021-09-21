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
	const productData = [
		{
			stockNumber: 'SN-123-001',
			productName: 'Dodo Bird',
			imageUrl:
				'https://animals.sandiegozoo.org/sites/default/files/styles/image_grid_half_width/public/2019-09/shoebill03.jpg',
			productDescription:
				'You probably wouldn’t win a staring contest with it, though you’d be hard pressed to look away. Taller than a mailbox, with an eight-foot wingspan, the shoebill is quite a kick to observe! This hefty bird with its lesson-in-gray plumage is endemic to swamps and wetlands of Central and East Africa. Solitary in nature, even when paired with another, the birds like their space and will feed at opposite ends of their territory.',
			stockQuantity: 2,
			category: 'birds',
			price: 800000,
		},
		{
			stockNumber: 'SN-123-002',
			productName: 'Panda Bear',
			imageUrl:
				'https://cdn.vox-cdn.com/thumbor/erBglLkGU0eWF6c2PsEWHT2_TE0=/12x0:4907x3263/1400x1400/filters:focal(12x0:4907x3263):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49388585/16071828377_85109fdee4_o.0.0.jpg',
			productDescription:
				'The red panda cubs, like many of the zoo’s other animals, were named to honor the land that they are native to. Red pandas are indigenous to the Himalayan mountain region that includes parts of Nepal, Myanmar, China and northern regions of India. “Zeya” is derived from the Burmese language, which is the official language of Myanmar. “Ila” can be translated as “earth” and comes from the ancient Sanskrit language from which many modern languages spoken in India are derived.',
			stockQuantity: 5,
			category: 'mammals',
			price: 800000,
		},
		{
			stockNumber: 'SN-123-003',
			productName: 'River Otter',
			imageUrl: 'https://critter.science/wp-content/uploads/2021/02/asco1-1180x520.jpg',
			productDescription:
				'Asian small-clawed otters are the smallest of all 13 otter species and are native to Asia. Well adapted to life in the water, these social, intelligent animals spend a majority of their time on land.',
			stockQuantity: 7,
			category: 'mammals',
			price: 800000,
		},
	];

	beforeEach(async () => {
		const createdProducts = await Promise.all(productData.map((data) => Product.create(data)));

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
