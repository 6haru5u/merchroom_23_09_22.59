// Artist information is kept separate from User because artists do not log in.
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    realName: String,
    type: { type: String, enum: ['solo', 'band', 'group'], default: 'solo' },
    bio: String,
    style: String,
    socialLinks: [String],
    profilePic: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('Artist', artistSchema);
