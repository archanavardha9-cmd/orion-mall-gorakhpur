import { BRAND_IMAGES, IMAGE_ASSETS, MOVIE_POSTERS, VIDEO_ASSETS } from '../assets/mediaRegistry';

export const MALL_INFO = {
  name: 'Orion Mall',
  city: 'Gorakhpur',
  state: 'Uttar Pradesh',
  locality: 'Mohaddipur, Gorakhpur, Uttar Pradesh 273008',
  landmark: 'Adjacent to Mohaddipur Chowk, Main Highway Corridor',
  hours: {
    retail: '10:30 AM – 10:00 PM',
    dining: '11:00 AM – 11:00 PM',
    cinema: '9:30 AM – 11:45 PM'
  },
  transit: [
    {
      mode: 'Gorakhpur Junction Railway Station',
      distance: '3.2 km · 10 mins',
      note: 'Direct corridor via Station Road and Mohaddipur Main Road.'
    },
    {
      mode: 'Mahayogi Gorakhnath Airport',
      distance: '6.8 km · 16 mins',
      note: 'Smooth highway approach along Kushinagar – Gorakhpur Road.'
    },
    {
      mode: 'Basement & Surface Parking',
      distance: 'Multi-level bays',
      note: 'Dedicated two-wheeler and four-wheeler entry off Mohaddipur Chowk.'
    }
  ],
  facilities: [
    'Sunlit Five-Level Central Atrium',
    'High-Speed Passenger Elevators & Escalators',
    'Multi-Level Covered Parking',
    'Wheelchair Access & Family Restrooms',
    '24x7 Security & Guest Assistance',
    'Express Cinema Lift Lobby'
  ]
};

export const FLOOR_LEVELS = [
  {
    id: 'ground',
    number: '00',
    label: 'Ground Floor',
    shortLabel: 'Ground',
    themeTitle: 'Tailoring, Casual Icons & Tech',
    subtitle: 'Grand Atrium Entry · Menswear, Footwear & Samsung Experience',
    accentColor: '#D64E34',
    video: VIDEO_ASSETS.groundLuxury,
    image: IMAGE_ASSETS.brandMenswear,
    brands: [
      {
        name: 'MAX Fashion',
        category: 'Family Apparel',
        highlight: 'Seasonal collections for men, women & youth',
        image: BRAND_IMAGES['MAX Fashion']
      },
      {
        name: 'UCB',
        category: 'Global Casualwear',
        highlight: 'Vibrant knitwear and everyday wardrobe essentials',
        image: BRAND_IMAGES.UCB
      },
      {
        name: "Levi's",
        category: 'Heritage Denim',
        highlight: 'Iconic 501 fits, trucker jackets & indigo craft',
        image: BRAND_IMAGES["Levi's"]
      },
      {
        name: 'Van Heusen',
        category: 'Power Dressing',
        highlight: 'Boardroom tailoring and crisp evening shirts',
        image: BRAND_IMAGES['Van Heusen']
      },
      {
        name: 'Louis Philippe',
        category: 'Luxury Menswear',
        highlight: 'Ceremonial suits, linen shirts & leather accents',
        image: BRAND_IMAGES['Louis Philippe']
      },
      {
        name: 'ColorPlus',
        category: 'Smart Casuals',
        highlight: 'Soft-wash chinos, polos & weekend dressing',
        image: BRAND_IMAGES.ColorPlus
      },
      {
        name: 'Being Human',
        category: 'Contemporary Youth',
        highlight: 'Graphic tees, relaxed denim & casual layering',
        image: BRAND_IMAGES['Being Human']
      },
      {
        name: 'Crocs',
        category: 'Iconic Footwear',
        highlight: 'Classic clogs, slides & customizable charms',
        image: BRAND_IMAGES.Crocs
      },
      {
        name: 'Samsung Experience Store',
        category: 'Flagship Electronics',
        highlight: 'Galaxy smartphones, tablets & wearables',
        image: BRAND_IMAGES['Samsung Experience Store']
      }
    ]
  },
  {
    id: 'first',
    number: '01',
    label: 'First Floor',
    shortLabel: 'First',
    themeTitle: 'Denim Culture & Activewear',
    subtitle: 'Upper Atrium Promenade · Streetwear & Performance Footwear',
    accentColor: '#0C8A7B',
    video: VIDEO_ASSETS.firstDenim,
    image: IMAGE_ASSETS.brandDenim,
    brands: [
      {
        name: 'Allen Solly',
        category: 'Friday Dressing',
        highlight: 'Playful workwear, chinos & smart casuals',
        image: BRAND_IMAGES['Allen Solly']
      },
      {
        name: 'Peter England',
        category: 'Everyday Menswear',
        highlight: 'Crisp formals, ceremonial wear & shirts',
        image: BRAND_IMAGES['Peter England']
      },
      {
        name: 'Pepe Jeans London',
        category: 'London Denim',
        highlight: 'Expressive washes & urban jackets',
        image: BRAND_IMAGES['Pepe Jeans London']
      },
      {
        name: 'Spykar',
        category: 'Youth Denim',
        highlight: 'Bold Indian denim craft & casual tees',
        image: BRAND_IMAGES.Spykar
      },
      {
        name: 'Mufti',
        category: 'Urban Menswear',
        highlight: 'Contemporary shirts & slim-fit denim',
        image: BRAND_IMAGES.Mufti
      },
      {
        name: 'Skechers',
        category: 'Comfort Footwear',
        highlight: 'Cushioned walking shoes & lifestyle sneakers',
        image: BRAND_IMAGES.Skechers
      },
      {
        name: 'Reebok',
        category: 'Performance Sport',
        highlight: 'Training gear & running footwear',
        image: BRAND_IMAGES.Reebok
      }
    ]
  },
  {
    id: 'second',
    number: '02',
    label: 'Second Floor',
    shortLabel: 'Second',
    themeTitle: 'Festive Couture, Bags & Kids',
    subtitle: 'Sunlit Gallery Wing · Ethnic Wear, Womenswear & Junior Style',
    accentColor: '#6C3EB8',
    video: VIDEO_ASSETS.secondEthnic,
    image: IMAGE_ASSETS.brandEthnic,
    brands: [
      {
        name: 'Soch',
        category: 'Indian Ethnic Couture',
        highlight: 'Festive sarees & embroidered occasionwear',
        image: BRAND_IMAGES.Soch
      },
      {
        name: 'W',
        category: 'Modern Ethnic Fusion',
        highlight: 'Contemporary kurtas & draped silhouettes',
        image: BRAND_IMAGES.W
      },
      {
        name: 'Aurelia',
        category: 'Everyday Ethnic',
        highlight: 'Breathable cotton kurtas & vibrant prints',
        image: BRAND_IMAGES.Aurelia
      },
      {
        name: 'Van Heusen Woman',
        category: 'Executive Womenswear',
        highlight: 'Tailored blazers & structured dresses',
        image: BRAND_IMAGES['Van Heusen Woman']
      },
      {
        name: 'U.S. Polo Assn. Kids',
        category: 'Junior Apparel',
        highlight: 'Preppy polos, denim & everyday kidswear',
        image: BRAND_IMAGES['U.S. Polo Assn. Kids']
      },
      {
        name: 'Lavie',
        category: 'Handbags & Clutches',
        highlight: 'Totes, satchels & statement accessories',
        image: BRAND_IMAGES.Lavie
      }
    ]
  },
  {
    id: 'third',
    number: '03',
    label: 'Third Floor',
    shortLabel: 'Third',
    themeTitle: 'KFC, Burger King & Domino’s',
    subtitle: "Social Dining Terrace · KFC, Burger King & Domino's Pizza",
    accentColor: '#D97706',
    video: VIDEO_ASSETS.diningTerrace,
    image: IMAGE_ASSETS.brandDining,
    brands: [
      {
        name: 'KFC',
        category: 'Crispy Chicken',
        highlight: 'Hot & Crispy buckets & Zinger burgers',
        image: BRAND_IMAGES.KFC
      },
      {
        name: 'Burger King',
        category: 'Flame-Grilled Burgers',
        highlight: 'Whopper classics, crispy fries & thick shakes',
        image: BRAND_IMAGES['Burger King']
      },
      {
        name: "Domino's Pizza",
        category: 'Fresh Hand-Tossed Pizza',
        highlight: 'Oven-baked pizzas & garlic breadsticks',
        image: BRAND_IMAGES["Domino's Pizza"]
      }
    ]
  },
  {
    id: 'fourth',
    number: '04',
    label: 'Fourth Floor',
    shortLabel: 'Fourth',
    themeTitle: 'PVR INOX Cinemas',
    subtitle: 'Multiplex Destination · Laser Projection & Plush Seating',
    accentColor: '#2563EB',
    video: VIDEO_ASSETS.cinemaAuditorium,
    image: IMAGE_ASSETS.brandCinema,
    brands: [
      {
        name: 'PVR INOX Cinemas',
        category: 'Multiplex Cinema',
        highlight: 'Multi-screen blockbuster screenings & Dolby sound',
        image: BRAND_IMAGES['PVR INOX Cinemas']
      }
    ]
  },
  {
    id: 'fifth',
    number: '05',
    label: 'Fifth Floor',
    shortLabel: 'Fifth',
    themeTitle: 'Upper Architectural & Operations Level',
    subtitle: 'Skylight Truss Deck & Building Services · No Retail Stores Listed',
    accentColor: '#65587C',
    video: VIDEO_ASSETS.atriumStory,
    image: IMAGE_ASSETS.mallAtriumEmpty,
    brands: []
  }
];

export const PVR_BOOKING_LINKS = {
  pvrOfficial: 'https://www.pvrcinemas.com/',
  bookMyShowGorakhpur: 'https://in.bookmyshow.com/explore/movies-gorakhpur'
};

export const CINEMA_EXPERIENCES = [
  {
    title: 'Horizon of Fire',
    language: 'Hindi · Action Drama',
    format: '2D · Dolby Surround',
    duration: '2h 28m',
    rating: 'UA',
    showtimes: ['10:45 AM', '1:50 PM', '5:15 PM', '8:45 PM'],
    poster: IMAGE_ASSETS.posterAction,
    synopsis: 'A metropolitan action drama across sweeping twilight horizons.',
    bookingUrl: 'https://in.bookmyshow.com/explore/movies-gorakhpur'
  },
  {
    title: 'Lanterns by the River',
    language: 'Hindi · Romantic Drama',
    format: '2D · Laser Projection',
    duration: '2h 14m',
    rating: 'U',
    showtimes: ['11:30 AM', '2:40 PM', '6:00 PM', '9:20 PM'],
    poster: IMAGE_ASSETS.posterDrama,
    synopsis: 'Two paths cross on misty riverfront evenings in an intimate musical drama.',
    bookingUrl: 'https://www.pvrcinemas.com/'
  },
  {
    title: 'Ringworld Odyssey',
    language: 'English / Hindi · Sci-Fi',
    format: '3D · Digital Atmos',
    duration: '2h 36m',
    rating: 'UA',
    showtimes: ['12:15 PM', '3:35 PM', '7:00 PM', '10:15 PM'],
    poster: IMAGE_ASSETS.posterScifi,
    synopsis: 'An orbital crew approaches a luminous ringed exoplanet beyond known space.',
    bookingUrl: 'https://in.bookmyshow.com/explore/movies-gorakhpur'
  },
  {
    title: 'Archway to Emerald Skies',
    language: 'Hindi / English · Family Adventure',
    format: '2D · Family Matinee',
    duration: '1h 58m',
    rating: 'U',
    showtimes: ['10:15 AM', '1:10 PM', '4:15 PM', '7:10 PM'],
    poster: IMAGE_ASSETS.posterFamily,
    synopsis: 'An uplifting expedition over terraced valleys and ancient sandstone arches.',
    bookingUrl: 'https://www.pvrcinemas.com/'
  }
];

export const INOX_ORION_BOOKING_URL =
  'https://in.bookmyshow.com/gorakhpur/cinemas/inox-orion-mall-gorakhpur/INOX/CGHP';

export const ENTERTAINMENT_MOVIES = {
  nowShowing: [
    {
      id: 'ramayana-part-1',
      title: 'Ramayana: Part 1',
      releaseDate: 'November 5, 2026',
      genre: 'Mythological Epic · Action · Drama',
      language: 'Hindi · English',
      description:
        'Directed by Nitesh Tiwari, this monumental Diwali theatrical epic brings the timeless legend of Ayodhya to life on laser-projected screens.',
      status: 'Now Showing',
      poster: MOVIE_POSTERS.ramayana,
      bookingUrl: INOX_ORION_BOOKING_URL
    },
    {
      id: 'drishyam-3',
      title: 'Drishyam 3',
      releaseDate: 'October 2, 2026',
      genre: 'Crime Thriller · Mystery · Drama',
      language: 'Hindi',
      description:
        'Fresh forensic evidence reopens the long-dormant investigation, forcing Vijay Salgaonkar into one final battle of alibis and deception.',
      status: 'Now Showing',
      poster: MOVIE_POSTERS.drishyam3,
      bookingUrl: INOX_ORION_BOOKING_URL
    },
    {
      id: 'the-cat-in-the-hat',
      title: 'The Cat in the Hat',
      releaseDate: 'November 6, 2026',
      genre: 'Animation · Family · Fantasy',
      language: 'English · Hindi',
      description:
        'A colourful animated family adventure following the mischievous striped-hatted feline as he brings whimsical imagination to two siblings.',
      status: 'Now Showing',
      poster: MOVIE_POSTERS.catInHat,
      bookingUrl: INOX_ORION_BOOKING_URL
    }
  ],
  comingSoon: [
    {
      id: 'dune-part-three',
      title: 'Dune: Part Three',
      releaseDate: 'December 16, 2026',
      genre: 'Sci-Fi · Epic Adventure · Drama',
      language: 'English · Hindi',
      description:
        'Denis Villeneuve concludes the Arrakis saga as Emperor Paul Atreides confronts imperial intrigue and the cost of prophecy across the cosmos.',
      status: 'Coming Soon',
      poster: MOVIE_POSTERS.dune3
    },
    {
      id: 'avengers-doomsday',
      title: 'Avengers: Doomsday',
      releaseDate: 'December 17, 2026',
      genre: 'Superhero · Sci-Fi · Action',
      language: 'English · Hindi',
      description:
        'Allies across colliding realities assemble for an unprecedented multiverse showdown against the rise of Doctor Doom.',
      status: 'Coming Soon',
      poster: MOVIE_POSTERS.doomsday
    },
    {
      id: 'king',
      title: 'King',
      releaseDate: 'December 24, 2026',
      genre: 'Action · Thriller',
      language: 'Hindi',
      description:
        'Headlined by Shah Rukh Khan and directed by Siddharth Anand, a sleek international action-thriller arriving for the Christmas holiday window.',
      status: 'Coming Soon',
      poster: MOVIE_POSTERS.king
    }
  ],
  previouslyReleased: [
    {
      id: 'chhaava',
      title: 'Chhaava',
      releaseDate: 'February 14, 2025',
      genre: 'Historical Action · Drama',
      language: 'Hindi',
      description:
        "A stirring historical drama celebrating the valour, resilience, and military brilliance of Chhatrapati Sambhaji Maharaj.",
      status: 'Previously Released',
      poster: MOVIE_POSTERS.chhaava
    },
    {
      id: 'border-2',
      title: 'Border 2',
      releaseDate: 'January 23, 2026',
      genre: 'War · Action · Drama',
      language: 'Hindi',
      description:
        'A sweeping Republic Day war spectacle chronicling brotherhood and frontier courage across desert battlefields.',
      status: 'Previously Released',
      poster: MOVIE_POSTERS.border2
    },
    {
      id: 'the-odyssey',
      title: 'The Odyssey',
      releaseDate: 'July 17, 2026',
      genre: 'Epic Adventure · Fantasy',
      language: 'English · Hindi',
      description:
        "Christopher Nolan's mythic adaptation tracing Odysseus's perilous ten-year voyage home across tempestuous Mediterranean seas.",
      status: 'Previously Released',
      poster: MOVIE_POSTERS.odyssey
    }
  ]
};
