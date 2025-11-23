const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    trim: true
  },
  pesan: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
