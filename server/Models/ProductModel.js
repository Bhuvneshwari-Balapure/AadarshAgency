// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },

  productName: String,

  primaryUnit: String,
  primaryQty: Number,

  secondaryUnit: String,
  secondaryQty: Number,

  primaryPrice: Number,
  secondaryPrice: Number,

  availableQty: {
    type: Number,
    default: 0,
    immutable: function () {
      return this.isNew;
    },
  }, // can't edit
  lastUpdated: { type: Date, default: Date.now },

  hsnCode: String,
  gstPercent: { type: Number },
});

module.exports = mongoose.model("Product", productSchema);
