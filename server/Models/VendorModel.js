// models/Vendor.js
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
});

module.exports = mongoose.model("Vendor", vendorSchema);
