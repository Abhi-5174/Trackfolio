
const express = require("express");
const Investment = require("../models/Investments");

const router = express.Router();
const DEFAULT_TABLE = 'investments_fake';

// Helper function to clean numeric values
const cleanNumericValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const numValue = Number(value);
  return isNaN(numValue) ? null : numValue;
};

// GET investments
router.get('/investments/:tableName', async (req, res) => {
  const tableName = req.params.tableName || DEFAULT_TABLE;
  try {
    const investments = await Investment.find({ tableName }).sort({ createdAt: 1 });
    res.status(200).json(investments);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new investment
router.post('/investments/:tableName', async (req, res) => {
  const tableName = req.params.tableName || DEFAULT_TABLE;
  try {
    req.body.unit = cleanNumericValue(req.body.unit);
    req.body.amount = cleanNumericValue(req.body.amount);
    req.body.currency = req.body.currency || 'CHF';
    req.body.tableName = tableName;
    const newInvestment = new Investment(req.body);
    const savedInvestment = await newInvestment.save();
    res.status(201).json(savedInvestment);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update investment
router.put('/investments/:tableName/:id', async (req, res) => {
  const tableName = req.params.tableName || DEFAULT_TABLE;
  try {
    req.body.unit = cleanNumericValue(req.body.unit);
    req.body.amount = cleanNumericValue(req.body.amount);
    req.body.currency = req.body.currency || 'CHF';
    req.body.tableName = tableName;
    const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvestment) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.json(updatedInvestment);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE investment
router.delete('/investments/:tableName/:id', async (req, res) => {
  const tableName = req.params.tableName || DEFAULT_TABLE;
  try {
    const deletedInvestment = await Investment.findByIdAndDelete(req.params.id);
    if (!deletedInvestment) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.json(deletedInvestment);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;