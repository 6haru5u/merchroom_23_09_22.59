const mongoose = require('mongoose');
const {
  encrypt,
  decrypt,
  encryptArray,
  decryptArray,
  emailLookup,
} = require('../utils/fieldEncryption');

const userSchema = new mongoose.Schema(
  {
    // PII is encrypted at rest; emailLookup supports exact login and duplicate checks.
    email: { type: String, required: true, set: encrypt, get: decrypt },
    emailLookup: { type: String, required: true, unique: true, index: true, select: false },
    firstName: { type: String, set: encrypt, get: decrypt },
    lastName: { type: String, set: encrypt, get: decrypt },
    phone: { type: String, set: encrypt, get: decrypt },
    interests: { type: [String], set: encryptArray, get: decryptArray },
    address: { type: String, set: encrypt, get: decrypt },
    paymentMethods: { type: [String], set: encryptArray, get: decryptArray },
    profilePicture: { type: String, set: encrypt, get: decrypt },
    socialAccounts: { type: [String], set: encryptArray, get: decryptArray },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    employeeId: String,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre('validate', function setEmailLookup() {
  if (this.email) {
    this.emailLookup = emailLookup(this.email);
  }
});

userSchema.statics.emailLookupFor = emailLookup;

module.exports = mongoose.model('User', userSchema);
