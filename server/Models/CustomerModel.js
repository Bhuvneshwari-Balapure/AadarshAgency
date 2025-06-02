const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      // required: true,
      // unique: true,
    },
    address: {
      type: String,
      // required: true,
    },
    creditLimit: {
      type: Number,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    creditDay: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
