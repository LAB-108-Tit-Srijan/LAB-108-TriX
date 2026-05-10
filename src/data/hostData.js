export const hostAnalytics = {
  totalBookings: 142,
  monthlyRevenue: '₹2,45,000',
  occupancyRate: '82%',
  upcomingGuests: 28,
  rentalOrders: 45,
  averageRating: 4.8
};

export const hostProperties = [
  {
    id: 'p1',
    name: 'Himalayan Backpacker Hostel',
    location: 'Kasol, HP',
    type: 'Hostel',
    image: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80',
    occupancy: '90%',
    earnings: '₹1,20,000',
    activeBookings: 18,
    rating: 4.7,
    aiInsight: 'Café images increase booking conversion by 15%. Consider adding more.'
  },
  {
    id: 'p2',
    name: 'Riverside Luxury Cabin',
    location: 'Tirthan Valley, HP',
    type: 'Cabin',
    image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80',
    occupancy: '75%',
    earnings: '₹85,000',
    activeBookings: 6,
    rating: 4.9,
    aiInsight: 'Weekend pricing can be increased by 10% due to high demand.'
  },
  {
    id: 'p3',
    name: 'Goa Tropical Villa',
    location: 'Vagator, Goa',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80',
    occupancy: '60%',
    earnings: '₹40,000',
    activeBookings: 4,
    rating: 4.8,
    aiInsight: 'Promote extended stays for digital nomads to improve weekday occupancy.'
  }
];

export const hostBookings = [
  {
    id: 'b1',
    guest: 'Arjun K.',
    guestImage: 'https://i.pravatar.cc/150?img=11',
    property: 'Himalayan Backpacker Hostel',
    dates: '12 Nov - 15 Nov',
    room: 'Private Dorm',
    status: 'Confirmed',
    amount: '₹3,500',
    request: 'Late night check-in requested (11 PM).'
  },
  {
    id: 'b2',
    guest: 'Meera & Rohan',
    guestImage: 'https://i.pravatar.cc/150?img=5',
    property: 'Riverside Luxury Cabin',
    dates: '18 Nov - 21 Nov',
    room: 'Entire Cabin',
    status: 'Pending',
    amount: '₹18,000',
    request: 'Couple celebrating anniversary. Cake requested.'
  },
  {
    id: 'b3',
    guest: 'Sneha P.',
    guestImage: 'https://i.pravatar.cc/150?img=20',
    property: 'Goa Tropical Villa',
    dates: '20 Nov - 25 Nov',
    room: 'Master Suite',
    status: 'Confirmed',
    amount: '₹25,000',
    request: 'Requires high-speed WiFi for work.'
  }
];

export const hostRentals = [
  {
    id: 'r1',
    item: 'Royal Enfield Himalayan',
    category: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80',
    total: 5,
    booked: 3,
    available: 2,
    revenue: '₹12,000'
  },
  {
    id: 'r2',
    item: 'Pro Camping Kit (2 Person)',
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1504280390467-339eb54cb150?auto=format&fit=crop&q=80',
    total: 10,
    booked: 8,
    available: 2,
    revenue: '₹8,500'
  }
];

export const hostMessages = [
  {
    id: 'm1',
    guest: 'Rahul V.',
    guestImage: 'https://i.pravatar.cc/150?img=33',
    message: 'Hi! Is the trail to the waterfall open right now?',
    time: '10 min ago',
    unread: true
  },
  {
    id: 'm2',
    guest: 'Pooja M.',
    guestImage: 'https://i.pravatar.cc/150?img=44',
    message: 'We loved the cafe recommendation! The food was amazing.',
    time: '2 hours ago',
    unread: false
  }
];
