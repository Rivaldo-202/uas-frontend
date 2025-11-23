const Registration = require('../models/Registration');

// Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single registration
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    
    res.json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create registration
exports.createRegistration = async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json({ success: true, data: registration, message: 'Pendaftaran berhasil!' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update registration status
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    
    res.json({ success: true, data: registration });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete registration
exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    
    res.json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};