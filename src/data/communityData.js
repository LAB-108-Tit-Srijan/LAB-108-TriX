export const communityStories = [
  { id: 1, user: 'Aisha K.', avatar: 'https://i.pravatar.cc/150?img=1', location: 'Kasol, HP', image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80', viewed: false },
  { id: 2, user: 'Rahul V.', avatar: 'https://i.pravatar.cc/150?img=11', location: 'Goa', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80', viewed: false },
  { id: 3, user: 'Meera S.', avatar: 'https://i.pravatar.cc/150?img=5', location: 'Rishikesh', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80', viewed: true },
  { id: 4, user: 'Arjun T.', avatar: 'https://i.pravatar.cc/150?img=33', location: 'Spiti Valley', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80', viewed: false },
  { id: 5, user: 'Pooja M.', avatar: 'https://i.pravatar.cc/150?img=44', location: 'Meghalaya', image: 'https://images.unsplash.com/photo-1518182170546-076616fdcb18?auto=format&fit=crop&q=80', viewed: true },
];

export const chatRooms = [
  { id: 'c1', name: 'Himachal Travelers', members: 1240, active: 112, tags: ['Trekking', 'Hostels', 'Cafés'], image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80' },
  { id: 'c2', name: 'Goa Backpackers', members: 3420, active: 450, tags: ['Beaches', 'Parties', 'Scooters'], image: 'https://images.unsplash.com/photo-1560205001-a1e64903330e?auto=format&fit=crop&q=80' },
  { id: 'c3', name: 'Solo Travelers India', members: 8900, active: 1200, tags: ['Safety', 'Meetups', 'Budget'], image: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80' },
  { id: 'c4', name: 'Digital Nomads', members: 2100, active: 89, tags: ['Workation', 'WiFi', 'Cafés'], image: 'https://images.unsplash.com/photo-1599423300746-b625333285a6?auto=format&fit=crop&q=80' }
];

export const travelPartners = [
  { id: 'p1', user: 'Neha', age: 24, destination: 'Kasol & Tosh', dates: '12th - 18th Nov', style: 'Budget / Hostels', budget: '₹8,000', interests: ['Café Hopping', 'Treks'], avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 'p2', user: 'Vikram', age: 28, destination: 'Spiti Circuit', dates: '1st - 15th Dec', style: 'Bike Trip / Camps', budget: '₹25,000', interests: ['Photography', 'Riding'], avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'p3', user: 'Sneha', age: 26, destination: 'South Goa', dates: 'Flexible (Dec)', style: 'Workation / Homestays', budget: '₹15,000', interests: ['Yoga', 'Sunsets'], avatar: 'https://i.pravatar.cc/150?img=20' },
];

export const communityFeed = [
  {
    id: 'f1',
    user: 'Karan D.',
    avatar: 'https://i.pravatar.cc/150?img=15',
    location: 'Jim Morrison Café, Kasol',
    time: '2 hours ago',
    content: 'Just discovered this hidden gem in Kasol. You have to hike up a bit, but the vegetarian food and the vibe are unmatched! Definitely a must-visit for anyone in Parvati Valley. 🌲☕️',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80',
    likes: 342,
    comments: 28,
    tags: ['Hidden Gem', 'Café', 'Kasol']
  },
  {
    id: 'f2',
    user: 'Ananya P.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    location: 'Zostel, Bir Billing',
    time: '5 hours ago',
    content: 'Sunset from the hostel rooftop after a crazy paragliding session. Nothing beats the hostel community vibe here! Met travelers from 5 different countries today. 🌅🪂',
    image: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80',
    likes: 512,
    comments: 45,
    tags: ['Hostel Life', 'Sunset', 'Solo Travel']
  },
  {
    id: 'f3',
    user: 'Rohan M.',
    avatar: 'https://i.pravatar.cc/150?img=60',
    location: 'Nongriat, Meghalaya',
    time: '1 day ago',
    content: 'The trek to the Double Decker Living Root Bridge was exhausting but completely worth it. Taking a dip in the natural pools nearby is the ultimate therapy. Highly recommend wearing good trekking shoes! 🌿💧',
    image: 'https://images.unsplash.com/photo-1518182170546-076616fdcb18?auto=format&fit=crop&q=80',
    likes: 890,
    comments: 112,
    tags: ['Trekking', 'Nature', 'Meghalaya']
  }
];
