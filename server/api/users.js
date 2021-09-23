const router = require('express').Router();
const {
	models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username'],
		});
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
});

//POST /api/users (create a new user)
router.post('/', async (req, res, next) => {
	try {
		let newUser = await User.create(req.body);
		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

//DELETE /api/users/:id (delete user)
router.delete('/:id', async (req, res, next) => {
	try {
		await User.destroy({ where: { id: req.params.id } });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

// PUT /api/users/:id (edit admin privileges)
router.put('/:id', async (req, res, next) => {
	try {
		let updatedUserPrivileges = await User.findByPk(req.params.id);
		res.json(await updatedUserPrivileges.update(req.body));
	} catch (err) {
		next(err);
	}
});
