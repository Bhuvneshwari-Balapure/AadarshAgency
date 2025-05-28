const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    purchaseRate: Number,
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
