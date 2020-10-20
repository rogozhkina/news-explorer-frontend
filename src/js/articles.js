const articles = [
  {
    source: {
      id: null,
      name: 'digg.com',
    },
    author: '@pang-chieh',
    title: "This 'Saw' Mask Tiramisu Is Pure, Unmitigated Nightmare Fuel",
    description:
      "It'll make you miss the simple, frustrating days of everything being cake.",
    url:
      'https://digg.com/2020/saw-mask-tiramisu-is-pure-unmitigated-nightmare-fuel',
    urlToImage:
      'https://cdn.digg.com/wp-content/uploads/2020/10/12184652/Screen-Shot-2020-10-12-at-2.46.28-PM.png',
    publishedAt: '2020-10-12T18:50:32Z',
    content: null,
  },
  {
    source: {
      id: null,
      name: 'Telegraph.co.uk',
    },
    author: 'Diana Henry',
    title: 'Pear, Marsala, coffee and chocolate trifle recipe',
    description: 'A trifle very much inspired by tiramisu.',
    url:
      'https://www.telegraph.co.uk/recipes/0/pear-marsala-coffee-chocolate-trifle-recipe/',
    urlToImage:
      'https://www.telegraph.co.uk/content/dam/recipes/2020/09/29/pear-trifle_trans_NvBQzQNjv4Bqj9yc40DX_0EyyiL0UAnIMvV2Kj9S-wKdyRQ5TuyHSo0.png?impolicy=logo-overlay',
    publishedAt: '2020-10-02T12:00:00Z',
    content:
      'A trifle very much inspired by tiramisu. You could use pears tinned in natural juice though not syrup if you dont want to poach them yourself. This still works well without the hazelnuts if youre mak… [+2807 chars]',
  },
  {
    source: {
      id: null,
      name: 'Sallysbakingaddiction.com',
    },
    author: 'Sally',
    title: 'Tiramisu Crepe Cake',
    description:
      "Tiramisu Crepe Cake\nI'm bringing you a brand new cake recipe on my blog today, complete with homemade crepes (which was a Sally's Baking Challenge recipe earlier this year!) and creamy tiramisu mascarpone filling. About 50 layers total! Though it looks and so…",
    url: 'http://sallysbakingaddiction.com/tiramisu-crepe-cake/',
    urlToImage:
      'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2020/10/tiramisu-mille-crepe-cake-2.jpg',
    publishedAt: '2020-10-19T15:00:46Z',
    content:
      'This impressive tiramisu crepe cake features 25 paper-thin homemade crepes, 24 layers of fluffy tiramisu filling, dustings of cocoa powder, and is finished with sweet whipped cream on top. It’s almos… [+14989 chars]',
  },
  {
    source: {
      id: null,
      name: 'Foodgawker.com',
    },
    author: 'lipodve',
    title: 'VEGAN TIRAMISU FUDGE',
    description:
      'This Vegan Tiramisu Fudge is so easy and simple to make and so so creamy Keep it in the fridge or freezer depending on what you prefer!',
    url: 'https://foodgawker.com/post/2020/10/15/917576/',
    urlToImage:
      'https://foodgawker.com//photo2.foodgawker.com/wp-content/uploads/2020/10/3652587.jpg',
    publishedAt: '2020-10-15T15:40:19Z',
    content: '',
  },
  {
    source: {
      id: null,
      name: 'Foodgawker.com',
    },
    author: '5 star cookies',
    title: 'Tiramisu Ferrero Italian Cake',
    description: 'Tiramisu Ferrero Italian Cake – Your Dream Easy Dessert',
    url: 'https://foodgawker.com/post/2020/09/19/913510/',
    urlToImage:
      'https://foodgawker.com//photo2.foodgawker.com/wp-content/uploads/2020/09/3644149.jpg',
    publishedAt: '2020-09-20T03:17:12Z',
    content: null,
  },
  {
    source: {
      id: null,
      name: 'Foodgawker.com',
    },
    author: 'Spoonabilities',
    title: 'Pistachio Tiramisu Cake',
    description:
      'Pistachio Tiramisu Cake is a layered sponge cake filled with whipped mascarpone cream & aromatic cardamom syrup. A dessert mix of Italian &',
    url: 'https://foodgawker.com/post/2020/10/02/915642/',
    urlToImage:
      'https://foodgawker.com//photo2.foodgawker.com/wp-content/uploads/2020/09/3648496.jpg',
    publishedAt: '2020-10-02T17:20:12Z',
    content: null,
  },
  {
    source: {
      id: null,
      name: 'Foodgawker.com',
    },
    author: 'SaporitoKitchen',
    title: 'Amazing Tiramisu Cheesecake Brownie',
    description:
      'These amazing Tiramisu Cheesecake Brownies are layered with rich chocolate brownie, coffee dipped lady fingers & a thick layer of cheesecake',
    url: 'https://foodgawker.com/post/2020/10/17/917903/',
    urlToImage:
      'https://foodgawker.com//photo.foodgawker.com/wp-content/uploads/2020/10/3653176.jpg',
    publishedAt: '2020-10-17T14:22:16Z',
    content: null,
  },
  {
    source: {
      id: null,
      name: 'Dessertsforbreakfast.com',
    },
    author: 'Steph (desserts for breakfast)',
    title: 'A donut "tiramisu" trifle',
    description:
      "What do you do when you find yourself with over 50 donuts in the house? This past week, I've been working on a collab with a donut shop & ba...",
    url:
      'https://www.dessertsforbreakfast.com/2020/09/a-donut-tiramisu-trifle.html',
    urlToImage:
      'https://1.bp.blogspot.com/-Q4JcypnYtMs/X3Ew_Fbot4I/AAAAAAAAR9U/Nj6Io5BucKYYhgJnklr5SD4KNeamznGLACNcBGAsYHQ/w1200-h630-p-k-no-nu/forblog.gif',
    publishedAt: '2020-09-28T01:41:00Z',
    content:
      "What do you do when you find yourself with over 50 donuts in the house?This past week, I've been working on a collab with a donut shop & bakery (can't wait to share more... soon!) and was left with a… [+3918 chars]",
  },
  {
    source: {
      id: null,
      name: 'Lefigaro.fr',
    },
    author: 'Cécile Bertrand',
    title: 'Emily in Paris : Terra Nera, le restaurant de la série Netflix',
    description:
      "Le restaurant rebaptisé «Les deux compères» pour le tournage de la série «Emily in Paris» jouit d'une nouvelle popularité.",
    url:
      'https://www.lefigaro.fr/societes/emily-in-paris-terra-nera-le-restaurant-de-la-serie-netflix-20201012',
    urlToImage:
      'https://i.f1g.fr/media/cms/629x354_crop/2020/10/10/6dbcffe8a436997b70e79dc46cc768468e60681656de40d255456ae4515f4135.png',
    publishedAt: '2020-10-12T04:00:18Z',
    content:
      "Au 18 rue des Fossés Saint-Jacques, à Paris (5e), les passants se succèdent pour prendre en photo la devanture rouge du restaurant Italien «Terra Nera». L'adresse est l'un des lieux de tournage de la… [+2920 chars]",
  },
  {
    source: {
      id: null,
      name: 'CNET',
    },
    author: 'Jen Wheeler',
    title:
      "Advent calendars 2020: The best food and drink ones we've seen so far - CNET",
    description:
      'From wine and cheese to beer and pork rinds, these go way beyond chocolate.',
    url:
      'https://www.cnet.com/health/advent-calendars-2020-the-best-food-and-drink-ones-weve-seen-so-far/',
    urlToImage:
      'https://cnet1.cbsistatic.com/img/Q8Bgi_3p0WD6rOP7qWtLkIzp4V8=/1200x630/2019/10/24/87009f92-208c-482a-970f-6e4ffe883da5/vinebox-advent-calendar.jpg',
    publishedAt: '2020-10-05T14:45:04Z',
    content:
      'The best Advent calendar hinges on your personal taste, but if you prioritize food and drink these 2020 Advent calendars -- full of everything from cheese and chocolate to wine and beer -- are all de… [+5963 chars]',
  },
];
