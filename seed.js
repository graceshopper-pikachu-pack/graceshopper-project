const { green, red } = require("chalk");
const { db } = require("./server/db");
const User = require("./server/db/models/User");
const Product = require("./server/db/models/Product");

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
    price: 800000,
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
    price: 800000,
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
    price: 800000,
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
    price: 800000,
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
    price: 800000,
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
    price: 800000,
  },
  {
    stockNumber: "SN-123-007",
    productName: "Aldabra Tortoise",
    imageUrl:
      "https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/aldabratortoise-003.jpg",
    productDescription: `Aldabra tortoises are easily domesticated and can learn to identify their keepers in a short time. Aldabras are one of the world's largest land tortoises. Males are considerably larger than females and have longer, thicker tails.`,
    stockQuantity: 2,
    category: "reptiles",
    price: 800000,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh no! Something went wrong!"));
      console.error(err);
      db.close();
    });
}

module.exports = seed;
