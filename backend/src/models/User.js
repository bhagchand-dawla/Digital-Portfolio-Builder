const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String }, // Remove unique constraint
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Project: [{
    title: { type: String, required: true },
      description: { type: String, required: true },
      gitRepoLink: { type: String, required: true },
      videoLink: { type: String, required: true }
  }],
}, { timestamps: true });



module.exports = mongoose.model('User', UserSchema);
