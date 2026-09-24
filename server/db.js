// Database connection for MongoDB.
require('dotenv').config();

const mongoose = require('mongoose');
const dns = require('dns');

// Use stable DNS resolvers for MongoDB Atlas SRV lookups on some networks.
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing. Add it to server/.env or the deployment environment variables.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('[DATABASE] MongoDB connected successfully');
  } catch (error) {
    console.error('[DATABASE] Connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
