require('dotenv').config();

const connectDB = require('../db');
const User = require('../models/User');

async function migrate() {
  await connectDB();
  const users = await User.find().select('+emailLookup');
  for (const user of users) {
    // Re-assign decrypted values so the schema setters write AES-256-GCM ciphertext.
    ['email', 'firstName', 'lastName', 'phone', 'address', 'profilePicture'].forEach((field) => { user[field] = user[field]; });
    ['interests', 'paymentMethods', 'socialAccounts'].forEach((field) => { user[field] = user[field]; });
    await user.save();
  }
  console.log(`Encrypted personal data for ${users.length} user records.`);
  await User.syncIndexes();
  process.exit(0);
}

migrate().catch((error) => { console.error('Migration failed:', error.message); process.exit(1); });
