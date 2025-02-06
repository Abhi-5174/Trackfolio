// models/Asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  assetType: {
    type: String,
    enum: ['stock', 'crypto'], // Enum to specify asset types (stock or crypto)
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    trim: true, // Ensures no extra spaces
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
