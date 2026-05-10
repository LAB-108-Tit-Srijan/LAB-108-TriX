export const stayCategories = [
  'All',
  'Luxury Hotels',
  'Homestays',
  'Hostels',
  'Camps',
  'Cabins',
  'Budget Stays',
  'Boutique Hotels',
  'Wellness Retreats'
];

export const filterTags = [
  'Hostels',
  'Homestays',
  'Backpacker Friendly',
  'Budget Stays',
  'Solo Traveler',
  'Student Budget',
  'Digital Nomad',
  'Workation',
  'Cafés Nearby',
  'Local Experiences'
];

export const stays = [
  {
    id: 'stay-1',
    name: 'The Himalayan Riverside Camp',
    location: 'Kasol, Himachal Pradesh',
    type: 'Camps',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 124,
    aiSummary: 'Perfect for peaceful cinematic Himachal escapes. Wake up to the sound of the Parvati River.',
    crowdLevel: 'Low',
    weather: '18°C · Pleasant',
    pricePerNight: 2500,
    tags: ['Couples', 'Local Experiences', 'Nature'],
    features: ['River View', 'Bonfire', 'Pet Friendly', 'Free Wi-Fi', 'Café'],
    host: {
      name: 'Ravi & Family',
      image: 'https://i.pravatar.cc/150?img=12',
      description: 'Local Himachali family running this riverside camp for 10 years. Known for amazing traditional Dham.'
    },
    rooms: [
      { id: 'r1', type: 'Luxury Swiss Tent', price: 2500, features: ['King Bed', 'Attached Washroom', 'River View'], image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80' },
      { id: 'r2', type: 'Standard Trekker Tent', price: 1500, features: ['Twin Beds', 'Shared Washroom'], image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Manikaran Sahib', distance: '4 km', time: '15 min drive', crowdLevel: 'High', type: 'Temple', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80' },
      { name: 'Chalal Trek Trail', distance: '2 km', time: '30 min walk', crowdLevel: 'Low', type: 'Trail', image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80' },
      { name: 'Parvati River Bank', distance: '100 m', time: '2 min walk', crowdLevel: 'Low', type: 'Nature', image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Evergreen Café', type: 'Israeli & Indian', description: 'Famous for falafel, hummus, and river views.' },
      { name: 'Jim Morrison Café', type: 'Vegetarian', description: 'Hidden away with amazing music and vegan options.' }
    ],
    description: 'Immerse yourself in nature at our premium riverside camp in Kasol. Experience the ultimate peaceful retreat away from the crowds.'
  },
  {
    id: 'stay-7',
    name: 'Zostel Parvati Valley',
    location: 'Kasol, Himachal Pradesh',
    type: 'Hostels',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 580,
    aiSummary: 'Perfect for solo travelers and backpackers looking to connect over bonfire jams.',
    crowdLevel: 'High',
    weather: '18°C · Pleasant',
    pricePerNight: 599,
    tags: ['Hostels', 'Backpacker Friendly', 'Budget Stays', 'Solo Traveler', 'Student Budget', 'Cafés Nearby'],
    features: ['Dorms', 'Social Vibe', 'Common Room', 'Café', 'Guitar/Games'],
    host: {
      name: 'Community Manager',
      image: 'https://i.pravatar.cc/150?img=33',
      description: 'The community managers here host daily events, treks, and music nights to bring backpackers together.'
    },
    rooms: [
      { id: 'r11', type: '6-Bed Mixed Dorm', price: 599, features: ['Bunk Bed', 'Locker', 'Shared Washroom', 'Reading Light'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80' },
      { id: 'r12', type: 'Private Room', price: 2200, features: ['Double Bed', 'Ensuite Bathroom', 'Mountain View'], image: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Jim Morrison Café', distance: '1.5 km', time: '20 min walk', crowdLevel: 'Medium', type: 'Café', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80' },
      { name: 'Tosh Route', distance: '20 km', time: '1 hr drive', crowdLevel: 'Medium', type: 'Exploration', image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Hostel Café', type: 'Continental', description: 'Great coffee, pancakes, and backpacker breakfasts.' },
      { name: 'Moon Dance Café', type: 'Bakery', description: 'Best German bakery treats in Kasol.' }
    ],
    description: 'A vibrant backpacker hostel in the heart of Kasol. Designed for youthful energy, offering dorms, cafes, and guided mountain treks.'
  },
  {
    id: 'stay-8',
    name: 'Ganga Yoga Retreat & Hostel',
    location: 'Rishikesh, Uttarakhand',
    type: 'Hostels',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599423300746-b625333285a6?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 420,
    aiSummary: 'A spiritual and wellness hub for digital nomads and solo wanderers seeking peace.',
    crowdLevel: 'Moderate',
    weather: '24°C · Sunny',
    pricePerNight: 750,
    tags: ['Hostels', 'Backpacker Friendly', 'Budget Stays', 'Solo Traveler', 'Digital Nomad', 'Workation'],
    features: ['Yoga Deck', 'Coworking Space', 'Vegan Café', 'River View', 'High-Speed WiFi'],
    host: {
      name: 'Anjali & Ved',
      image: 'https://i.pravatar.cc/150?img=5',
      description: 'Certified yoga instructors who turned their ancestral home into a haven for global backpackers.'
    },
    rooms: [
      { id: 'r13', type: '4-Bed Female Dorm', price: 750, features: ['Bunk Bed', 'AC', 'Shared Washroom'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80' },
      { id: 'r14', type: 'Yoga Private Room', price: 1800, features: ['Queen Bed', 'Attached Washroom', 'Ganga View'], image: 'https://images.unsplash.com/photo-1599423300746-b625333285a6?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Ganga Aarti (Parmarth Niketan)', distance: '2 km', time: '25 min walk', crowdLevel: 'High', type: 'Spiritual', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80' },
      { name: 'Beatles Ashram', distance: '3 km', time: '10 min drive', crowdLevel: 'Medium', type: 'History', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80' },
      { name: 'River Rafting Point', distance: '5 km', time: '15 min drive', crowdLevel: 'High', type: 'Adventure', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Little Buddha Café', type: 'Global', description: 'Treehouse style cafe overlooking the Ganga.' },
      { name: 'Chotiwala', type: 'North Indian', description: 'Famous traditional thalis.' }
    ],
    description: 'Perfect for workation and spiritual seekers. Features a dedicated co-working space, high-speed internet, and daily morning yoga sessions.'
  },
  {
    id: 'stay-9',
    name: 'Anjuna Tropical Backpacker Café',
    location: 'Anjuna, Goa',
    type: 'Hostels',
    image: 'https://images.unsplash.com/photo-1560205001-a1e64903330e?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80'
    ],
    rating: 4.6,
    reviews: 650,
    aiSummary: 'A vibrant social hostel steps away from the beach. Perfect for meeting fellow travelers.',
    crowdLevel: 'High',
    weather: '29°C · Sunny',
    pricePerNight: 899,
    tags: ['Hostels', 'Backpacker Friendly', 'Budget Stays', 'Solo Traveler', 'Cafés Nearby'],
    features: ['Pool', 'Bar', 'Live Music', 'AC Dorms', 'Scooter Rental'],
    host: {
      name: 'Goa Surf Club',
      image: 'https://i.pravatar.cc/150?img=11',
      description: 'Run by local surfers who know all the hidden beaches and best sunset spots.'
    },
    rooms: [
      { id: 'r15', type: '8-Bed AC Dorm', price: 899, features: ['Bunk Bed', 'AC', 'Locker', 'Curtain'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80' },
      { id: 'r16', type: 'Tropical Private Hut', price: 2500, features: ['Double Bed', 'Hammock', 'Outdoor Shower'], image: 'https://images.unsplash.com/photo-1560205001-a1e64903330e?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Anjuna Flea Market', distance: '1 km', time: '10 min walk', crowdLevel: 'High', type: 'Shopping', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80' },
      { name: 'Vagator Sunset Point', distance: '3 km', time: '10 min ride', crowdLevel: 'High', type: 'Scenic', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80' },
      { name: 'Hidden Beach Cafe', distance: '2 km', time: '5 min ride', crowdLevel: 'Low', type: 'Café', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Curlies', type: 'Goan/Seafood', description: 'Iconic beach shack with trance music.' },
      { name: 'Artjuna', type: 'Healthy/Mediterranean', description: 'Best breakfast and smoothie bowls.' }
    ],
    description: 'A legendary backpacker hub in Goa. Spend your days surfing, relaxing by the pool, and your nights enjoying live music at our in-house café.'
  },
  {
    id: 'stay-10',
    name: 'Khasi Heritage Homestay',
    location: 'Shillong, Meghalaya',
    type: 'Homestays',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518182170546-076616fdcb18?auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviews: 180,
    aiSummary: 'Perfect for authentic slow travel. Experience warm Khasi hospitality in a traditional wooden home.',
    crowdLevel: 'Low',
    weather: '15°C · Misty',
    pricePerNight: 1200,
    tags: ['Homestays', 'Budget Stays', 'Local Experiences', 'Solo Traveler'],
    features: ['Home Cooked Food', 'Cultural Tour', 'Fireplace', 'Garden'],
    host: {
      name: 'Auntie Mary',
      image: 'https://i.pravatar.cc/150?img=44',
      description: 'Auntie Mary prepares the most delicious traditional Khasi meals and shares stories of the region.'
    },
    rooms: [
      { id: 'r17', type: 'Cozy Wooden Room', price: 1200, features: ['Double Bed', 'Shared Washroom', 'Garden View'], image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80' },
      { id: 'r18', type: 'Attic Suite', price: 2000, features: ['Queen Bed', 'Attached Washroom', 'Skylight'], image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Elephant Falls', distance: '6 km', time: '20 min drive', crowdLevel: 'Medium', type: 'Waterfall', image: 'https://images.unsplash.com/photo-1518182170546-076616fdcb18?auto=format&fit=crop&q=80' },
      { name: 'Police Bazar', distance: '2 km', time: '10 min drive', crowdLevel: 'High', type: 'Market', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Dylan\'s Cafe', type: 'Cafe/Continental', description: 'Tribute to Bob Dylan, great coffee.' },
      { name: 'Trattoria', type: 'Authentic Khasi', description: 'Best Jadoh and traditional pork dishes.' }
    ],
    description: 'Feel at home in Meghalaya. Our wooden homestay offers an emotional connection to the local culture, with home-cooked meals and peaceful surroundings.'
  },
  {
    id: 'stay-2',
    name: 'Goan Heritage Villa',
    location: 'Assagao, Goa',
    type: 'Luxury Hotels',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviews: 312,
    aiSummary: 'Ideal for cinematic solo travel or romantic tropical escapes. A beautifully restored Portuguese villa.',
    crowdLevel: 'Moderate',
    weather: '28°C · Sunny',
    pricePerNight: 8500,
    tags: ['Couples', 'Digital Nomad', 'Luxury'],
    features: ['Private Pool', 'Heritage Architecture', 'In-house Chef', 'Spa'],
    host: {
      name: 'Villa Management',
      image: 'https://i.pravatar.cc/150?img=47',
      description: 'Professional hospitality team ensuring a 5-star experience.'
    },
    rooms: [
      { id: 'r3', type: 'Heritage Suite', price: 8500, features: ['Four-poster Bed', 'Balcony', 'Bathtub'], image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80' },
      { id: 'r4', type: 'Poolside Villa Room', price: 10500, features: ['King Bed', 'Direct Pool Access'], image: 'https://images.unsplash.com/photo-1618773928120-2c40951ea009?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Vagator Beach', distance: '5 km', time: '15 min drive', crowdLevel: 'High', type: 'Beach', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80' },
      { name: 'Gunpowder Restaurant', distance: '1 km', time: '10 min walk', crowdLevel: 'Medium', type: 'Dining', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Gunpowder', type: 'South Indian Fusion', description: 'Award-winning coastal cuisine.' },
      { name: 'Thalassa', type: 'Greek', description: 'Iconic sunset dining experience.' }
    ],
    description: 'A luxurious Portuguese-style homestay nestled in the quiet lanes of Assagao. Perfect for a premium Goan experience.'
  },
  {
    id: 'stay-3',
    name: 'Nubra Valley Luxury Camp',
    location: 'Nubra Valley, Ladakh',
    type: 'Camps',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80'],
    rating: 4.7,
    reviews: 89,
    aiSummary: 'Experience the magic of the cold desert. Best low-crowd high-altitude stay.',
    crowdLevel: 'Low',
    weather: '10°C · Clear Sky',
    pricePerNight: 6000,
    tags: ['Couples', 'Nature', 'Luxury'],
    features: ['Desert View', 'Stargazing', 'Heating', 'Local Cuisine'],
    host: {
      name: 'Tsering',
      image: 'https://i.pravatar.cc/150?img=50',
      description: 'Born and raised in Ladakh, Tsering ensures you experience genuine high-altitude hospitality.'
    },
    rooms: [
      { id: 'r5', type: 'Premium Desert Tent', price: 6000, features: ['Heated Blankets', 'Ensuite Bathroom', 'Mountain View'], image: 'https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Hunder Sand Dunes', distance: '2 km', time: '5 min drive', crowdLevel: 'Medium', type: 'Nature', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80' },
      { name: 'Diskit Monastery', distance: '10 km', time: '20 min drive', crowdLevel: 'Medium', type: 'Temple', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Camp Dining', type: 'Local Ladakhi', description: 'Fresh Thukpa and Momos prepared in-house.' }
    ],
    description: 'Stay in the heart of the cold desert with premium amenities. Witness breathtaking sunsets and stargaze in the clear Ladakhi night sky.'
  },
  {
    id: 'stay-4',
    name: 'Munnar Mist Cabin',
    location: 'Munnar, Kerala',
    type: 'Cabins',
    image: 'https://images.unsplash.com/photo-1596423735880-5f2a689b903e?auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1542153835-245c3b174066?auto=format&fit=crop&q=80'],
    rating: 4.9,
    reviews: 450,
    aiSummary: 'Romantic, foggy forest cabins surrounded by endless tea gardens.',
    crowdLevel: 'Moderate',
    weather: '20°C · Misty',
    pricePerNight: 4500,
    tags: ['Couples', 'Nature', 'Wellness'],
    features: ['Tea Garden View', 'Private Balcony', 'Ayurvedic Spa', 'Breakfast Included'],
    host: {
      name: 'Thomas',
      image: 'https://i.pravatar.cc/150?img=52',
      description: 'A retired tea-estate manager who built these beautiful cabins.'
    },
    rooms: [
      { id: 'r6', type: 'Treehouse Cabin', price: 6500, features: ['Elevated View', 'Queen Bed', 'Glass Walls'], image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80' },
      { id: 'r7', type: 'Classic Wooden Cabin', price: 4500, features: ['Balcony', 'Cozy Interiors'], image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'Eravikulam National Park', distance: '8 km', time: '30 min drive', crowdLevel: 'High', type: 'Nature', image: 'https://images.unsplash.com/photo-1542153835-245c3b174066?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Rapsy Restaurant', type: 'Kerala Parotta & Beef', description: 'A legendary local joint in Munnar town.' }
    ],
    description: 'Wake up to misty mornings and the aroma of fresh tea leaves. These wooden cabins offer an intimate escape into nature.'
  },
  {
    id: 'stay-5',
    name: 'Udaipur Royal Haveli',
    location: 'Udaipur, Rajasthan',
    type: 'Boutique Hotels',
    image: 'https://images.unsplash.com/photo-1599661505360-618d0426d0da?auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1586522074251-cefa423d7890?auto=format&fit=crop&q=80'],
    rating: 4.8,
    reviews: 210,
    aiSummary: 'Live like royalty. A cinematic lakeside heritage stay.',
    crowdLevel: 'High',
    weather: '25°C · Clear',
    pricePerNight: 12000,
    tags: ['Luxury', 'Couples', 'History'],
    features: ['Lake View', 'Rooftop Dining', 'Heritage Decor', 'Live Folk Music'],
    host: {
      name: 'Singhania Family',
      image: 'https://i.pravatar.cc/150?img=59',
      description: 'Preserving their ancestral haveli to offer an authentic royal experience.'
    },
    rooms: [
      { id: 'r8', type: 'Royal Lakeview Suite', price: 15000, features: ['Lake Pichola View', 'Jharokha Seating', 'Luxury Bath'], image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80' },
      { id: 'r9', type: 'Heritage Deluxe Room', price: 12000, features: ['Courtyard View', 'Antique Furniture'], image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80' }
    ],
    nearbyPlaces: [
      { name: 'City Palace', distance: '1 km', time: '10 min walk', crowdLevel: 'High', type: 'History', image: 'https://images.unsplash.com/photo-1586522074251-cefa423d7890?auto=format&fit=crop&q=80' }
    ],
    localFood: [
      { name: 'Ambrai', type: 'North Indian', description: 'Dine by the lake with views of the illuminated City Palace.' }
    ],
    description: 'A restored 18th-century haveli right on the banks of Lake Pichola. Experience genuine Rajasthani royal hospitality.'
  }
];
