// models/Vendor.js
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
    required: true,
  },
  name: String,
  mobile: String,
  email: String,
  address: String,
});

module.exports = mongoose.model("Vendor", vendorSchema);
