const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT;
module.exports = router;

const authRequired = async (req, res, next) => {
  // We grab the token from the cookies
  const token = req.headers.authorization;
  // jwt verify throws an exception when the token isn't valid
  try {
    const response = await jwt.verify(token, secret);

    const { id, adminStatus } = await jwt.verify(token, secret);
    req.userId = id;
    req.adminStatus = adminStatus;
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    return;
  }
  next();
};

router.get("/", authRequired, async (req, res, next) => {
  try {
    // only admins should be able to see all users
    if (req.adminStatus) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "username", "firstName", "lastName", "email", "adminStatus", "address"],
      });
      res.status(200).json(users);
    }
  } catch (err) {
    next(err);
  }
});

//POST /api/users (create a new user)
router.post("/", async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/users/:id (delete user)
router.delete("/:id", authRequired, async (req, res, next) => {
  try {
    if (req.adminStatus) {
      // if an admin is deleting a user, confirm they are an admin
      await User.destroy({ where: { id: req.params.id } });
      res.sendStatus(204);
    } else {
      // if a user is deleting themself, confirm they are the user
      await User.destroy({ where: { id: req.userId } });
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id (edit admin privileges)
router.put("/:id", async (req, res, next) => {
  try {
    if (req.adminStatus) {
      let updatedUserPrivileges = await User.findByPk(req.params.id);
      res.json(await updatedUserPrivileges.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});
