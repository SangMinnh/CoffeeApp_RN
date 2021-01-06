const Images = [
  { image: require('../assets/banners/food-banner1.jpg') },
  { image: require('../assets/banners/food-banner2.jpg') },
  { image: require('../assets/banners/food-banner3.jpg') },
  { image: require('../assets/banners/food-banner4.jpg') },
  { image: require('../assets/banners/food-banner5.jpg') },
];

export const Foods = [
  {
    id: '1f',
    title: 'Hot Matcha Latte',
    price: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.',
    category: 'Coffee',

  },
  {
    id: '2f',
    price: 2,
    title: 'Caffè Americano',
    description: 'Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.',
    category: 'Coffee'

  },
  {
    id: '3f',
    price: 1,
    title: 'Cappuccino',
    description: 'Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft.',
    category: 'Coffee'

  },
  {
    id: '4f',
    price: 7,
    title: 'Caffè Latte',
    description: 'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up.',
    category: 'Coffee'

  },
  {
    id: '5f',
    price: 4,
    title: 'Berry Trio',
    description: 'Greet your day with powerful protein, flavorful berries and a cascade of crunch with our nonfat vanilla yogurt, sliced strawberries, whole blueberries, raspberries and crisp honey-oat granola.',
    category: 'Yogurt'
  },
  {
    id: '6f',
    price: 5,
    title: 'Strawberry Overnight',
    description: 'Dig into your day with our vegan overnight grains that include oatmeal, quinoa and chia seeds, plus shaved coconut, strawberries and toasted almonds.',
    category: 'Yogurt'
  },
  {
    id: '7f',
    price: 2,
    title: "Siggi's Yogurt Cup",
    description: "Simplicity reigns in this traditional Scandinavian recipe of pasteurized skim milk and Madagascar Bourbon Vanilla. And you'll never find artificial sweeteners, just sweet agave nectar. The result: a thick, creamy, protein-rich scoop of true vanilla yogurt.",
    category: 'Yogurt'
  },
  {
    id: '8f',
    price: 1,
    title: 'Star Drink',
    description: 'Starfruit- and kiwi-flavored juice and real kiwi fruit pieces added to coconutmilk and shaken with ice. Summer re-imagined.',
    category: 'Cold Drink'
  },
  {
    id: '9f',
    price: 8,
    title: 'Kiwi Starfruit',
    description: 'Starfruit- and kiwi-flavored juice and real kiwi fruit pieces shaken with ice. Deliciously refreshing.',
    category: 'Cold Drink'
  },
  {
    id: '10f',
    price: 2,
    title: 'Violet Drink',
    description: 'The sweet blackberries and tart hibiscus flavor of our Very Berry Hibiscus Starbucks Refreshers® beverage swirl together with creamy coconutmilk and ice, creating refreshing (and violet-hued!) sips.',
    category: 'Cold Drink'
  },
  {
    id: '11f',
    price: 5,
    title: 'Chocolate Fudge Brownie',
    description: 'Dark chocolate flavored ice cream matched with fudge swirls and mixed with fudge brownie pieces.',
    category: 'Ice Cream'
  },
  {
    id: '12f',
    price: 5,
    title: 'Black Cherry',
    description: 'Black cherry flavored ice cream with Bing cherries mixed throughout.',
    category: 'Ice Cream'
  },
  {
    id: '13f',
    price: 5,
    title: 'Egg Nog',
    description: 'Eggnog flavored ice cream with nutmeg and rum flavoring.',
    category: 'Ice Cream'
  },
  {
    id: '14f',
    price: 5,
    title: 'Chocolate',
    description: '',
    category: 'Ice Cream'
  },


]


export const FoodsCart = {
  idCart: 1,
  table: 6,
  totalPrice: 0,
  tableNumber: 1,
  listItem: [
    {
      idCart: '1',
      id: '1f',
      price: 5,
      title: 'Chocolate',
      amount: 1,
      size: 'M'
    },
    {
      idCart: '1',
      id: '2f',
      price: 2,
      title: 'Caffè Americano',
      amount: 1,
      size: 'M'

    },
    {
      idCart: '1',
      id: '3f',
      price: 1,
      title: 'Cappuccino',
      amount: 1,
      size: 'M'

    },
    {
      idCart: '1',
      id: '4f',
      price: 7,
      title: 'Caffè Latte',
      amount: 1,
      size: 'M'

    },
    {
      idCart: '1',
      id: '5f',
      price: 4,
      title: 'Berry Trio',
      amount: 1,
      size: 'M'
    },
  ],
};

export const CartDetail = [
  {
    idCart: '1',
    id: '1f',
    price: 5,
    title: 'Chocolate',
    amount: 1
  },
  {
    idCart: '1',
    id: '2f',
    price: 2,
    title: 'Caffè Americano',
    amount: 1

  },
  {
    idCart: '1',
    id: '3f',
    price: 1,
    title: 'Cappuccino',
    amount: 1

  },
  {
    idCart: '1',
    id: '4f',
    price: 7,
    title: 'Caffè Latte',
    amount: 1

  },
  {
    idCart: '1',
    id: '5f',
    price: 4,
    title: 'Berry Trio',
    amount: 1
  },
]




export const data = [
  {
    id: '1',
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[0].image,
    rating: 4,
    reviews: 99,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  },
  {
    id: '2',
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Second Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[1].image,
    rating: 5,
    reviews: 102,
    categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
  },
  {
    id: '3',
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Third Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[2].image,
    rating: 3,
    reviews: 220,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  },
  {
    id: '4',
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    title: 'Fourth Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[3].image,
    rating: 4,
    reviews: 48,
    categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
  },
  {
    id: '5',
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    title: 'Fifth Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[4].image,
    rating: 4,
    reviews: 178,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  },
  {
    id: '6',
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[0].image,
    rating: 4,
    reviews: 99,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  },
  {
    id: '7',
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Second Amazing Food Place',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
      
      Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
    image: Images[1].image,
    rating: 5,
    reviews: 102,
    categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
  },
];
