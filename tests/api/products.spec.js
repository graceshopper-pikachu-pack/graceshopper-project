/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');

const app = require('../../server/app');
const agent = request.agent(app);

const {
	db,
	models: { Product },
} = require('../../server/db');

describe('Product Routes', () => {
	beforeEach(async () => {
		console.log('About to sync db - will wipe out db!');
		await db.sync({ force: true });
	});

	describe('Product routes', () => {
		let dodoBird;
		let pandaBear;
		let riverOtter;

		beforeEach(async () => {
			console.log('beforeEach');
			const productData = [
				{
					stockNumber: 'SN-123-001',
					productName: 'Dodo Bird',
					imageUrl: 'https://assets.atlasobscura.com/article_images/61281/image.jpg',
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

			const createdProducts = await Promise.all(productData.map((data) => Product.create(data)));

			dodoBird = createdProducts[0];
			pandaBear = createdProducts[1];
			riverOtter = createdProducts[2];
		});

		describe('/api/products/', () => {
			xit('GET /api/products', () => {
				return agent
					.get('/api/products')
					.expect('Content-Type', /json/)
					.expect(200)
					.expect((res) => {
						expect(res.body).to.be.an.instanceOf(Array);
						expect(res.body.length).to.equal(3);
					});
			});

			it('POST /api/products', () => {
				return agent
					.post('/api/products')
					.send({
						stockNumber: 'SN-123-010',
						productName: 'Loch Ness Monster',
						productDescription: 'The fabled monster.',
						stockQuantity: 1,
						imageUrl: 'https://assets.atlasobscura.com/article_images/61281/image.jpg',
						category: 'birds',
						price: 1000000.0,
					})
					.expect(201)
					.expect('Content-Type', /json/)
					.expect((res) => {
						expect(res.body.productName).to.equal('Loch Ness Monster');
					});
			});

			xit('DELETE /api/products/:id', async () => {
				await agent.delete(`/api/products/${dodoBird.id}`).expect(204);
				const deletedProduct = await Product.findByPk(dodoBird.id);
				expect(deletedProduct).to.equal(null);
			});

			xit('PUT /api/products/:id', () => {
				return (
					request(app)
						.put(`/api/products/${dodoBird.id}`)
						.send({ productName: 'DoDo Bird' })
						.expect(200)
						//.expect('Content-Type', /json/)
						.expect((res) => {
							expect(res.body.productName).to.equal('DoDo Bird');
						})
				);
			}); // end describe('/api/products')
		}); // end describe('Product routes')
	});
});
