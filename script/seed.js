"use strict";

const {
  db,
  models: { User, Product, Cart, CartItem },
} = require("../server/db");
const { green, red } = require("chalk");

const users = [
  {
    firstName: "Suzanne",
    lastName: "Wong",
    email: "suzanne@ghp.com",
    address: "8037 Pine Road Orange Park, FL 32065",
    password: "blueorange3",
    username: "swong",
    adminStatus: false,
  },
  {
    firstName: "Gabby",
    lastName: "Apeadu",
    email: "gabby@ghp.com",
    address: "352 Talbot Street Olive Branch, MS 38654",
    password: "animalsloveme",
    username: "gapeadu",
    adminStatus: false,
  },
  {
    firstName: "Randy",
    lastName: "Stopa",
    email: "randy@ghp.com",
    address: "5 Sussex Street Rapid City, SD 57701",
    password: "Aquatica3!",
    username: "rstopa",
    adminStatus: true,
  },
  {
    firstName: "Audrey",
    lastName: "Maldonado",
    email: "audrey@ghp.com",
    address: "57 Arcadia Street Hendersonville, NC 28792",
    password: "DinosLand98~",
    username: "amaldonado",
    adminStatus: true,
  },
];

const cartTestUser1 = {
  firstName: "Banana",
  lastName: "Mango",
  email: "banana@banana.com",
  address: "1 Banana Ln, Banana Town, Banana Federation",
  password: "password",
  username: "banana",
  adminStatus: false,
};

const cartTestUser2 = {
  firstName: "Apple",
  lastName: "Apple",
  email: "apple@banana.com",
  address: "1 Apple drive, Big Apple, NY",
  password: "password",
  username: "apple",
  adminStatus: true,
};

const products = [
  {
    stockNumber: "SN-123-001",
    productName: "Shoebill Stork",
    imageUrl:
      "https://animals.sandiegozoo.org/sites/default/files/styles/image_grid_half_width/public/2019-09/shoebill03.jpg",
    productDescription:
      "You probably wouldn’t win a staring contest with it, though you’d be hard pressed to look away. Taller than a mailbox, with an eight-foot wingspan, the shoebill is quite a kick to observe! This hefty bird with its lesson-in-gray plumage is endemic to swamps and wetlands of Central and East Africa. Solitary in nature, even when paired with another, the birds like their space and will feed at opposite ends of their territory.",
    stockQuantity: 2,
    category: "birds",
    price: 800001,
  },
  {
    stockNumber: "SN-123-002",
    productName: "Red Panda",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/erBglLkGU0eWF6c2PsEWHT2_TE0=/12x0:4907x3263/1400x1400/filters:focal(12x0:4907x3263):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49388585/16071828377_85109fdee4_o.0.0.jpg",
    productDescription:
      "The red panda cubs, like many of the zoo’s other animals, were named to honor the land that they are native to. Red pandas are indigenous to the Himalayan mountain region that includes parts of Nepal, Myanmar, China and northern regions of India. “Zeya” is derived from the Burmese language, which is the official language of Myanmar. “Ila” can be translated as “earth” and comes from the ancient Sanskrit language from which many modern languages spoken in India are derived.",
    stockQuantity: 5,
    category: "mammals",
    price: 800002,
  },
  {
    stockNumber: "SN-123-003",
    productName: "Oriental Small-clawed Otter",
    imageUrl:
      "https://critter.science/wp-content/uploads/2021/02/asco1-1180x520.jpg",
    productDescription:
      "Asian small-clawed otters are the smallest of all 13 otter species and are native to Asia. Well adapted to life in the water, these social, intelligent animals spend a majority of their time on land.",
    stockQuantity: 7,
    category: "mammals",
    price: 800003,
  },
  {
    stockNumber: "SN-123-004",
    productName: "Mandarin Duck",
    imageUrl:
      "https://pyxis.nymag.com/v1/imgs/6aa/326/8227a769871ef982b00bf715b101e5d961-6-hot-duck-b.rsocial.w1200.jpg",
    productDescription:
      'Small exotic-looking duck found at lakes and parks, usually with nearby trees. Male very ornate with big orangey "sail fins" on the back, streaked orangey cheeks, and a small red bill with a whitish tip. Female has narrow white spectacles on shaggy gray head, bold pale dappled spots along flanks, and pale bill tip. Mainly found in pairs or singly, but will gather in larger flocks over the winter; perches readily in trees over water. Native to East Asia, but has established feral populations throughout Western Europe.',
    stockQuantity: 8,
    category: "birds",
    price: 800004,
  },
  {
    stockNumber: "SN-123-005",
    productName: "Ring-tail Lemur",
    imageUrl:
      "https://nationalzoo.si.edu/sites/default/files/animals/20110407-071mm.jpg",
    productDescription:
      "Ring-tailed lemurs are named for the 13 alternating black and white bands that adorn their tails. Unlike most other lemurs, ringtails spend 40 percent of their time on the ground, moving quadrupedally along the forest floor.",
    stockQuantity: 3,
    category: "mammals",
    price: 800005,
  },
  {
    stockNumber: "SN-123-006",
    productName: "Axolotl",
    imageUrl:
      "https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg",
    productDescription:
      "Shrouded in mystery, and defying typical biological laws like metamorphosis, the axolotl (pronounced AX-oh-lot-ul), a type of salamander, keeps its webbed feet firmly placed in infancy throughout its life. Unlike other salamanders, axolotls are neotenic, meaning they keep juvenile characteristics into adulthood. The axolotl remains aquatic (like larvae) their entire life.Though  vaguely reminiscent of primates, they are actually most closely related to anteaters and armadillos.",
    stockQuantity: 7,
    category: "amphibians",
    price: 800006,
  },
  {
    stockNumber: "SN-123-007",
    productName: "Aldabra Tortoise",
    imageUrl:
      "https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/aldabratortoise-003.jpg",
    productDescription: `Aldabra tortoises are easily domesticated and can learn to identify their keepers in a short time. Aldabras are one of the world's largest land tortoises. Males are considerably larger than females and have longer, thicker tails.`,
    stockQuantity: 2,
    category: "reptiles",
    price: 800007,
  },
];

const cartItems1 = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 2 },
  { productId: 3, quantity: 1 },
  { productId: 4, quantity: 1 },
  { productId: 5, quantity: 2 },
];

const cartItems2 = [
  { productId: 2, quantity: 1 },
  { productId: 6, quantity: 2 },
  { productId: 7, quantity: 1 },
  { productId: 4, quantity: 1 },
  { productId: 3, quantity: 1 },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  // Creating Users
  await Promise.all(
    users.map(async (user) => {
      const newUser = await User.create(user);
      await Cart.create({ userId: newUser.id });
      return newUser;
    })
  );

  // Creating Products
  await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );

  // user to test cart
  const newCartTestUser1 = await User.create(cartTestUser1);
  const newCart1 = await Cart.create({ userId: newCartTestUser1.id });

  const newCartTestUser2 = await User.create(cartTestUser2);
  const newCart2 = await Cart.create({ userId: newCartTestUser2.id });

  // // Adding items to cart
  await Promise.all(
    cartItems1.map((item) => {
      return CartItem.create({ cartId: newCart1.id, ...item });
    })
  );

  await Promise.all(
    cartItems2.map((item) => {
      return CartItem.create({ cartId: newCart2.id, ...item });
    })
  );

  console.log(green(`seeded ${users.length} users`));
  console.log(green(`seeded ${products.length} products`));
  console.log(green("Seeding success!"));
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(red("Oh no! Something went wrong!"));
    console.error(err);
    console.log(red(err));
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
