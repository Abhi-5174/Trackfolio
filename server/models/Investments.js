
const mongoose = require('mongoose');

// Investment Schema
const investmentSchema = new mongoose.Schema({
    name: String,
    provider: String,
    investment_type: String,
    investment_name: String,
    amount: Number,
    currency: String,
    unit: Number,
    notes: String,
    tableName: { type: String, default: 'investments_fake' }
  }, { timestamps: true });

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;