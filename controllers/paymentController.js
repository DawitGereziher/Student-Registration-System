const Payment = require('../models/paymentModel');

// Create a new payment
const createPayment = async (req, res) => {
  const { userId, amount, courseId, paymentMethod, status } = req.body;

  try {
    const newPayment = new Payment({ userId, amount, courseId, paymentMethod, status });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: 'Payment creation failed', details: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId courseId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments', details: error.message });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id).populate('userId courseId');
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payment', details: error.message });
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(id, updateData, { new: true });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: 'Payment update failed', details: error.message });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Payment deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};