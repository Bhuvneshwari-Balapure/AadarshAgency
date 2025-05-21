// models/Salesman.js
const mongoose = require("mongoose");

const salesmanSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

  name: String,
  designation: String,
  mobile: String,
  email: String,
  city: String,
  address: String,
  altMobile: String,
  photo: String,
  username: String,
});

module.exports = mongoose.model("Salesman", salesmanSchema);
