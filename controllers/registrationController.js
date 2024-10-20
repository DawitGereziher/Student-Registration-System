const Registration = require('../models/registrationModel');

// Register a user for a course
const registerUserForCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const newRegistration = new Registration({ userId, courseId });
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

// Get all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate('userId courseId');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve registrations', details: error.message });
  }
};

// Get a registration by ID
const getRegistrationById = async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findById(id).populate('userId courseId');
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve registration', details: error.message });
  }
};

// Update a registration by ID
const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const registration = await Registration.findByIdAndUpdate(id, updateData, { new: true });
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json(registration);
  } catch (error) {
    res.status(400).json({ error: 'Registration update failed', details: error.message });
  }
};

// Delete a registration by ID
const deleteRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findByIdAndDelete(id);
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  registerUserForCourse,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};