// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dimpahar');
    console.log(`MongoDB Operational Gateway Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Engine Connection failure: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
