'use strict';

const {
  db,
  models: { User, Product, Cart, CartItem },
} = require('../server/db');
const { green, red } = require('chalk');

const users = [
  {
    firstName: 'Suzanne',
    lastName: 'Wong',
    email: 'suzanne@ghp.com',
    address: '8037 Pine Road Orange Park, FL 32065',
    password: 'blueorange3',
    username: 'swong',
    adminStatus: false,
  },
  {
    firstName: 'Gabby',
    lastName: 'Apeadu',
    email: 'gabby@ghp.com',
    address: '352 Talbot Street Olive Branch, MS 38654',
    password: 'animalsloveme',
    username: 'gapeadu',
    adminStatus: false,
  },
  {
    firstName: 'Randy',
    lastName: 'Stopa',
    email: 'randy@ghp.com',
    address: '5 Sussex Street Rapid City, SD 57701',
    password: 'Aquatica3!',
    username: 'rstopa',
    adminStatus: true,
  },
  {
    firstName: 'Audrey',
    lastName: 'Maldonado',
    email: 'audrey@ghp.com',
    address: '57 Arcadia Street Hendersonville, NC 28792',
    password: 'DinosLand98~',
    username: 'amaldonado',
    adminStatus: true,
  },
];

const cartTestUser1 = {
  firstName: 'Banana',
  lastName: 'Mango',
  email: 'banana@banana.com',
  address: '1 Banana Ln, Banana Town, Banana Federation',
  password: 'password',
  username: 'banana',
  adminStatus: false,
};

const cartTestUser2 = {
  firstName: 'Apple',
  lastName: 'Apple',
  email: 'apple@banana.com',
  address: '1 Apple drive, Big Apple, NY',
  password: 'password',
  username: 'apple',
  adminStatus: true,
};

const products = [
  {
    stockNumber: 'SN-123-001',
    productName: 'Shoebill Stork',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/styles/image_grid_half_width/public/2019-09/shoebill03.jpg',
    productDescription:
      'You probably wouldn’t win a staring contest with it, though you’d be hard pressed to look away. Taller than a mailbox, with an eight-foot wingspan, the shoebill is quite a kick to observe! This hefty bird with its lesson-in-gray plumage is endemic to swamps and wetlands of Central and East Africa. Solitary in nature, even when paired with another, the birds like their space and will feed at opposite ends of their territory.',
    stockQuantity: 2,
    category: 'BIRDS',
    price: 800001,
  },
  {
    stockNumber: 'SN-123-002',
    productName: 'Red Panda',
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/erBglLkGU0eWF6c2PsEWHT2_TE0=/12x0:4907x3263/1400x1400/filters:focal(12x0:4907x3263):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49388585/16071828377_85109fdee4_o.0.0.jpg',
    productDescription:
      'The red panda cubs, like many of the zoo’s other animals, were named to honor the land that they are native to. Red pandas are indigenous to the Himalayan mountain region that includes parts of Nepal, Myanmar, China and northern regions of India. “Zeya” is derived from the Burmese language, which is the official language of Myanmar. “Ila” can be translated as “earth” and comes from the ancient Sanskrit language from which many modern languages spoken in India are derived.',
    stockQuantity: 5,
    category: 'MAMMALS',
    price: 30000,
  },
  {
    stockNumber: 'SN-123-003',
    productName: 'Oriental Small-clawed Otter',
    imageUrl:
      'https://critter.science/wp-content/uploads/2021/02/asco1-1180x520.jpg',
    productDescription:
      'Asian small-clawed otters are the smallest of all 13 otter species and are native to Asia. Well adapted to life in the water, these social, intelligent animals spend a majority of their time on land.',
    stockQuantity: 7,
    category: 'MAMMALS',
    price: 40000,
  },
  {
    stockNumber: 'SN-123-004',
    productName: 'Mandarin Duck',
    imageUrl:
      'https://pyxis.nymag.com/v1/imgs/6aa/326/8227a769871ef982b00bf715b101e5d961-6-hot-duck-b.rsocial.w1200.jpg',
    productDescription:
      'Small exotic-looking duck found at lakes and parks, usually with nearby trees. Male very ornate with big orangey "sail fins" on the back, streaked orangey cheeks, and a small red bill with a whitish tip. Female has narrow white spectacles on shaggy gray head, bold pale dappled spots along flanks, and pale bill tip. Mainly found in pairs or singly, but will gather in larger flocks over the winter; perches readily in trees over water. Native to East Asia, but has established feral populations throughout Western Europe.',
    stockQuantity: 8,
    category: 'BIRDS',
    price: 1000,
  },
  {
    stockNumber: 'SN-123-005',
    productName: 'Ring-tail Lemur',
    imageUrl:
      'https://nationalzoo.si.edu/sites/default/files/animals/20110407-071mm.jpg',
    productDescription:
      'Ring-tailed lemurs are named for the 13 alternating black and white bands that adorn their tails. Unlike most other lemurs, ringtails spend 40 percent of their time on the ground, moving quadrupedally along the forest floor.',
    stockQuantity: 3,
    category: 'MAMMALS',
    price: 25000,
  },
  {
    stockNumber: 'SN-123-006',
    productName: 'Axolotl',
    imageUrl:
      'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg',
    productDescription:
      'Shrouded in mystery, and defying typical biological laws like metamorphosis, the axolotl (pronounced AX-oh-lot-ul), a type of salamander, keeps its webbed feet firmly placed in infancy throughout its life. Unlike other salamanders, axolotls are neotenic, meaning they keep juvenile characteristics into adulthood. The axolotl remains aquatic (like larvae) their entire life.Though  vaguely reminiscent of primates, they are actually most closely related to anteaters and armadillos.',
    stockQuantity: 7,
    category: 'AMPHIBIANS',
    price: 500,
  },
  {
    stockNumber: 'SN-123-007',
    productName: 'Aldabra Tortoise',
    imageUrl:
      'https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/aldabratortoise-003.jpg',
    productDescription: `Aldabra tortoises are easily domesticated and can learn to identify their keepers in a short time. Aldabras are one of the world's largest land tortoises. Males are considerably larger than females and have longer, thicker tails.`,
    stockQuantity: 2,
    category: 'REPTILES',
    price: 10000,
  },
  {
    stockNumber: 'SN-123-008',
    productName: 'Siamese Fighting Fish',
    imageUrl:
      'https://www.peta.org/wp-content/uploads/2019/08/iStock-644996948_itthipolB-1.jpg',
    productDescription: `Betta fish are native to Asia, where they live in the shallow water of marshes, ponds, or slow-moving streams. Male bettas are devoted fathers who build bubble nests for their young with their mouths and fiercely protect their babies from predators. Just like us, betta fish are diurnal. That means they’re active during the day and sleep at night, requiring darkness to get a good night’s rest.`,
    stockQuantity: 15,
    category: 'FISH',
    price: 550,
  },
  {
    stockNumber: 'SN-123-009',
    productName: 'Common Clownfish',
    latinName: 'Amphiprioninae'
    imageUrl: 'https://s28164.pcdn.co/files/common-clownfish-89-1280x720.jpg',
    productDescription: `Both the anemone and clownfish live in a symbiotic relationship, meaning the anemone benefits from the presence of the clownfish, while the clownfish benefits from living with the anemone. It is thought that the clownfish feeds upon parasites and debris amongst the anemone’s tentacles, and in return scares away fish that may prey upon the anemone, as well as giving the anemone better water circulation as it fans its fins while swimming around. It is possible that the clownfish also lures fish for the anemone to kill and eat.`,
    stockQuantity: 15,
    category: 'FISH',
    price: 250,
    funFact: "Schools of clownfish have a strict hierarchy, with the most aggressive female at the top.  All clownfish are born male. When the dominant female dies, the dominant male will turn itself into a female."
  },
  {
    stockNumber: 'SN-123-010',
    productName: 'Red Eyed Tree Frog',
    latinName: 'Agalychnis callidryas'
    imageUrl:
      'https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/newsroom/20181129-roshanpatel03.jpg?itok=6ZIFQmw1',
    productDescription: `Red-eyed tree frogs are recognized around the world as an ambassador for all tropical amphibian species. With their large, red eyes, their blue-green bodies and orange toes—they have a striking beauty about them. They also have adhesive toepads, which enable them to climb up any surface. They are the most recognizable frog in the world! `,
    stockQuantity: 5,
    category: 'AMPHIBIANS',
    price: 2000,
    funFact: 'Frogs, in general, are a pretty old bunch. Fossils show that frogs have been around for hundreds of millions of years; red-eyed tree frogs specifically emerged roughly 10 million years ago. These amphibians are arboreal, meaning they spend a lot of time hiding in the trees. The frogs live in tropical lowlands in Central America and northern South America, and though one might think that its bright red eyes and blue and yellow markings would put the amphibian in danger, the crafty frog actually uses its flashy colors to its advantage.'
  },
  {
    stockNumber: 'SN-123-021',
    productName: 'Pink-toed tarantula',
    latinName: 'Avicularia avicularia',
    imageUrl:
      'https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/pinktoedtarantula-001.jpg',
    productDescription: `The pink-toed tarantula is a small, arboreal species native to the rainforests of South America. The mature pink-toe tarantula has a dark-colored body and pinkish feet, hence its name..
	`,
    stockQuantity: 25,
    category: 'INVERTEBRATES',
    price: 500,
    funFact: `The tarantulas are active predators, feeding on a variety of invertebrates as well as small vertebrates like mice, frogs and lizards. Tarantulas hunt at night and rely on their large size to subdue prey.`,
  },
  {
    stockNumber: 'SN-123-022',
    productName: 'Blue-ringed octopus',
    latinName: 'Hapalochlaena',
    imageUrl:
      'https://oceanconservancy.org/wp-content/uploads/2018/12/David-Evison_Fotolia.jpg',
    productDescription: `Blue-ringed octopus is a  highly venomous species of octopus that is found in tide pools and coral reefs in the Pacific and Indian oceans. They can be identified by their yellowish skin and characteristic blue and black rings that change color dramatically when the animal is threatened. `,
    stockQuantity: 8,
    category: 'AMPHIBIANS',
    price: 2500,
    funFact: `The Blue-ringed octopus' venom is 1,000 times more powerful than cyanide, and this tiny octopus packs enough venom to kill 26 humans within minutes.`,
  },
  {
    stockNumber: 'SN-123-023',
    productName: 'Bluefin Tuna',
    latinName: 'Thunnus thynnus',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/18/Bluefin-big.jpg',
    productDescription: `Bluefin are the largest tunas and can live up to 40 years. They migrate across all oceans and can dive deeper than 3,000 feet. Bluefin tuna are made for speed: built like torpedoes, have retractable fins and their eyes are set flush to their body. `,
    stockQuantity: 14,
    category: 'FISH',
    price: 5000,
    funFact: `They are tremendous predators from the moment they hatch, seeking out schools of fish like herring, mackerel, and even eels. They hunt by sight and have the sharpest vision of any bony fish. `,
  },
  {
    stockNumber: 'SN-123-024',
    productName: 'Electric eel',
    latinName: 'Electrophorus electricus',
    imageUrl:
      'https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/electric-eel-homepage-slide.jpg',
    productDescription: `The electric eel is a knifefish and is more closely related to catfish and carp than to other eel families. `,
    stockQuantity: 5,
    category: 'FISH',
    price: 1500,
    funFact: `Electric eels are capable of generating up to 800 volts of electricity!`,
  },
  {
    stockNumber: 'AM-123-006',
    productName: 'Damselfly',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_dragonfly.jpg',
    productDescription:
      'Meet another kind of dinosaur: When you think of dinosaurs, you might think of those found in the movie Jurassic Park. But there are many other prehistoric animals that are still around today. And some lived even before dinosaurs first appeared: dragonflies and damselflies! These two insects are in the same taxonomic family, Odonata. They look pretty similar and are often called odonates.',
    stockQuantity: 20,
    category: 'INVERTEBRATES',
    price: 525,
    latinName: "Zygoptera",
    funFacts: "With a lifespan that may last from a few weeks to several years, depending on the species, most often, once they reach adulthood, they will only live a few weeks. During that short span, they lay hundreds or thousands of eggs. Depending on the water temperature, incubation may take anywhere from 5 days to several months."
  },
  {
    stockNumber: 'AM-123-007',
    productName: 'Echidna',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/2016-09/animals_hero_echidna.jpg',
    productDescription:
      'The echidna (ih-KID-na), or spiny anteater, is an unusual mammal. It is so different from any other that it still puzzles researchers and scientists. The echidna has remained unchanged since prehistoric times, finding ways to survive while other species became extinct. But what really sets the echidna apart from other mammals? Female echidnas lay eggs! Egg-laying mammals are called monotremes. There are only five monotremes in the world: four echidna species, and one platypus species.',
    stockQuantity: 20,
    category: 'MAMMALS',
    price: 525,
    latinName: "Tachyglossidae",
    funFacts: "Egg laying mammals are called monotremes. There are only three monotremes in the world: the long-beaked echidna, short-beaked echidna, and platypus. Both male and female echidnas have a pouch on the belly making it difficult to tell one from the other. The echidna's snout is very sensitive and can feel vibrations"
  },
  {
    stockNumber: 'AM-123-008',
    productName: 'Crowned Eagle',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/2016-10/animal_hero_african_crowned_eagle.jpg',
    productDescription:
      "The most powerful eagle in Africa. Crowned eagles are not the largest eagles in Africa—martial eagles claim that title—but they are the most powerful. Their legs are thick, and they have a very long talon on each back toe that helps them kill animals more than four times their size. Crowned eagles live in the tall woodland forests and rain forests of Africa. They are often seen on Africa's savannas as well. Built for flying among trees, the crowned eagle's wings are short and broad, and its long tail helps guide the bird like a rudder guides a boat. These features allow the eagle to fly easily through the branches.",
    stockQuantity: 10,
    category: 'BIRDS',
    price: 525,
    latinName: "Coronatus",
    funFacts: "A crowned eagle can swoop after prey in the air at 100 miles (160 kilometers) per hour yet brake to a halt within 20 feet (6 meters). It pushes its powerful wings against the air currents to slow down. The flight of the crowned eagle is remarkably quiet, much like the silent flight of owls."
  },
  {
    stockNumber: 'AM-123-009',
    productName: 'Iguana',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/2017-12/animals_hero_blue-iguana.jpg',
    productDescription:
      'Iguanas are some of the largest lizards found in the Americas, with their whiplike tail making up about half of that length. Like other reptiles, iguanas are cold-blooded, egg-laying animals with an excellent ability to adapt to their environment. Iguana species vary greatly in size, color, behavior, and their endangered status in the wild. Some, like the green iguana, are quite common; others, like Fiji’s banded iguanas, are endangered. Iguanas native to San Diego County are the desert iguana and the chuckwalla.',
    stockQuantity: 33,
    category: 'REPTILES',
    price: 200,
    latinName: "Iguanidae",
    funFacts: "Marine iguanas of the Galápagos Islands (off the coast of Ecuador) are excellent swimmers. n the Animal Kingdom, males often have the brightest colors, but not among green iguanas; males are often a bright orange, females are green, and the juveniles are a brilliant green."
  },
  {
    stockNumber: 'AM-123-010',
    productName: 'Mantella',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_mantella.jpg',
    productDescription:
      'Poisonous jewels of Madagascar: Tiny mantella frogs are among the most brightly colored and spectacular of all frogs. Most can be found in a variety of color combinations—inky black with brilliant splotches of orange, bronze, yellow, blue, or emerald green. These bright, eye-catching colors serve as a warning to predators that the little frogs are poisonous.',
    stockQuantity: 20,
    category: 'AMPHIBIANS',
    price: 525,
    latinName: "Mantellidae",
    funFacts: "The golden mantella is the most well known. Individuals can be yellow, bright orange, or orange-red in color. The variegated mantella lives in the high grasslands of Central Madagascar. It burrows during the dry season to keep from drying out."
  },
  {
    stockNumber: 'AM-123-011',
    productName: 'Matschie Tree Kangaroo',
    imageUrl:
      'https://animals.sandiegozoo.org/sites/default/files/2017-12/animals_hero_matschiestreekangaroo.jpg',
    productDescription:
      'In forests of towering trees covered in moss and ferns lives the elusive and remarkable tree kangaroo. Locals call it the “ghost of the forest” because it is so hard to find and moves so quickly. No one is exactly sure when this small marsupial in the kangaroo family took to the trees, but it is clearly well adapted for life on high, with long, bark-gripping claws, strong limbs for climbing, and a long tail for balance. These are good traits to have for an animal that spends most of its time 100 feet or more above the ground, nibbling ferns and orchids and looking out at dizzying views over the forest canopy.',
    stockQuantity: 8,
    category: 'INVERTEBRATES',
    price: 1223,
    latinName: "Dendrolagus matschiei",
    funFacts: "Jump to it! Matschie’s tree kangaroos can leap 60 feet to the ground without injury. Like water off a duck’s back. Curly whorls on the tree kangaroo’s back fur let water run right off it."
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
  console.log(green('Seeding success!'));
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(red('Oh no! Something went wrong!'));
    console.error(err);
    console.log(red(err));
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
