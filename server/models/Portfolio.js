// models/Portfolio.js
const mongoose = require("mongoose");
const Asset = require("./Asset"); // Import Asset model

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (make sure you have User model in place)
      required: true,
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset", // Reference to the Asset model
      },
    ],
    totalValue: {
      type: Number,
      required: true,
      default: 0, // Default value if no assets are added
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// You can add custom methods to calculate the total portfolio value
portfolioSchema.methods.calculateTotalValue = async function () {
  let total = 0;
  for (let assetId of this.assets) {
    const asset = await Asset.findById(assetId);
    total += asset.quantity * asset.purchasePrice; // Calculation: quantity * purchase price
  }
  this.totalValue = total;
  await this.save(); // Save the updated portfolio value
};

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
