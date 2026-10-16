// backend/seed.js
const mongoose = require('mongoose');
require('dotenv').config();

const Room = require('./models/Room');
const Settings = require('./models/Settings');
const MenuItem = require('./models/MenuItem'); // 🔌 Import your new Menu Model

const sampleCottages = [
  {
    title: 'Chimbuk Cloud Eco-Villa',
    slug: 'chimbuk-cloud-eco-villa',
    description: 'Perched perfectly on the rugged ridge lines of Chimbuk Peak. Features panoramic floor-to-ceiling glass panel walls designed to capture the rolling morning mist. Constructed entirely out of sustainable local bamboo, cured teak timber, and mountain stone elements.',
    pricePerNight: 9500,
    maxOccupancy: 2,
    bedConfig: '1 Premium King Bed',
    amenities: ['Private Sunrise Balcony', 'Open Air Rainfall Shower', 'Artisanal Coffee Station', 'Complimentary High-speed Wi-Fi'],
    images: ['https://unsplash.com'],
    isAvailable: true
  },
  {
    title: 'Nilgiri Valley Panorama Pavilion',
    slug: 'nilgiri-valley-panorama-pavilion',
    description: 'An expansive premium mountain estate floating above the clouds. Offers a massive outdoor cantilevered viewing deck facing the Sangu River valley fields. Perfect for families looking for unmatched tranquility.',
    pricePerNight: 14500,
    maxOccupancy: 4,
    bedConfig: '2 Deluxe Queen Beds',
    amenities: ['360 Cantilevered Observation Deck', 'Soaking Bathtub', 'Private Lounge Area', 'Mini Bar Fridge'],
    images: ['https://unsplash.com'],
    isAvailable: true
  }
];

const defaultSettings = {
  heroEyebrow: 'A HILLSIDE ESCAPE IN BANDARBAN',
  heroHeading: 'Escape to\nthe Hills.',
  heroSubheading: 'Stay above the clouds. Taste the heart of the hills. Experience pristine eco-luxury built in complete harmony with nature.',
  heroSlides: [
    { url: 'https://unsplash.com', alt: 'Bandarban green mountain ranges' },
    { url: 'https://unsplash.com', alt: 'Eco-luxury hilltop cottage deck' },
    { url: 'https://unsplash.com', alt: 'Golden hour sunrise ridges' }
  ]
};

const defaultMenu = [
  { name: 'Bamboo Charcoal Chicken', price: 650, category: 'Signature', description: 'Slow-cooked inside organic mountain bamboo trunks with wild hill herbs.' },
  { name: 'Traditional Marma Mundi', price: 320, category: 'Traditional', description: 'Fresh rice noodles served in a savory hill-fish broth with local garnishes.' },
  { name: 'Wild Hill Honey Tea', price: 180, category: 'Beverage', description: 'Premium black tea leaves infused with raw wild honey gathered from Bandarban forests.' }
];

async function seedSystemDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dimpahar';
    console.log('Connecting to database via:', mongoUri);
    await mongoose.connect(mongoUri);

    // Wipe old test items cleanly
    await Room.deleteMany({});
    await Settings.deleteMany({});
    await MenuItem.deleteMany({});

    // Bulk write active data entries
    await Room.insertMany(sampleCottages);
    await Settings.create(defaultSettings);
    await MenuItem.insertMany(defaultMenu);

    console.log('✨ Success: Dynamic system content database seeding completed perfectly!');
    process.exit(0);
  } catch (error) {
    console.error('Critical database seeding execution failure:', error);
    process.exit(1);
  }
}

seedSystemDatabase();
