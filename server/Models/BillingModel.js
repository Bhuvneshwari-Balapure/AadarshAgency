// models/Billing.js
const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      unitType: String, // kg or piece
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],

  discounts: {
    scheme: Number,
    cashDiscount: Number,
  },

  totalAmount: Number,
  netAmount: Number,

  salesmanId: { type: mongoose.Schema.Types.ObjectId, ref: "Salesman" },

  billingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Billing", billingSchema);
