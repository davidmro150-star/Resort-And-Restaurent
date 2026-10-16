// backend/seed.js
const mongoose = require('mongoose');
require('dotenv').config();

const Room = require('./models/Room');
const Settings = require('./models/Settings'); // 🔌 Import Settings Schema

const sampleCottages = [
  {
    title: 'Chimbuk Cloud Eco-Villa',
    slug: 'chimbuk-cloud-eco-villa',
    description: 'Perched perfectly on the rugged ridge lines of Chimbuk Peak...',
    pricePerNight: 9500,
    maxOccupancy: 2,
    bedConfig: '1 Premium King Bed',
    amenities: ['Private Sunrise Balcony', 'Open Air Rainfall Shower'],
    images: ['https://unsplash.com'],
    isAvailable: true
  }
];

const defaultSettings = {
  heroEyebrow: 'A HILLSIDE ESCAPE IN BANDARBAN',
  heroHeading: 'Escape to the Hills.',
  heroSubheading: 'Stay above the clouds. Taste the heart of the hills. Experience pristine eco-luxury built in complete harmony with nature.',
  heroSlides: [
    { url: 'https://unsplash.com', alt: 'Bandarban green mountain ranges' },
    { url: 'https://unsplash.com', alt: 'Eco-luxury hilltop cottage deck' },
    { url: 'https://unsplash.com', alt: 'Golden hour sunrise ridges' }
  ]
};

async function seedSystemDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dimpahar';
    await mongoose.connect(mongoUri);
    console.log('Seeder pipeline connected.');

    // Clear and re-populate
    await Room.deleteMany({});
    await Room.insertMany(sampleCottages);

    await Settings.deleteMany({});
    await Settings.create(defaultSettings);
    console.log('Dynamic site settings successfully seeded!');

    process.exit(0);
  } catch (error) {
    console.error('Critical database seeding execution failure:', error);
    process.exit(1);
  }
}

seedSystemDatabase();
