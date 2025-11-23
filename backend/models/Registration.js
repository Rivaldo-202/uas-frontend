const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  namaLengkap: {
    type: String,
    required: true,
    trim: true
  },
  nim: {
    type: String,
    required: true,
    trim: true
  },
  fakultas: {
    type: String,
    required: true,
    trim: true
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true
  },
  alasanBergabung: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', RegistrationSchema);