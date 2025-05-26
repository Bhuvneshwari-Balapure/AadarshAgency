const mongoose = require("mongoose");

const BillingItemSchema = new mongoose.Schema({
  productName: String,
  categoryName: String,
  hsnCode: String,
  unit: String,
  qty: Number,
  rate: Number,
  sch: Number,
  schAmt: Number,
  cd: Number,
  cdAmt: Number,
  total: Number,
  gst: Number,
  amount: Number,
});

const InvoiceSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  salesmanId: { type: mongoose.Schema.Types.ObjectId, ref: "Salesman" },

  customer: {
    CustomerName: String,
    Billdate: Date,
    advanceAmt: Number,
    paymentMode: String,
  },
  billing: [BillingItemSchema],
  finalAmount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);

// // models/Billing.js
// const mongoose = require("mongoose");

// const billingSchema = new mongoose.Schema({
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       unitType: String, // kg or piece
//       quantity: Number,
//       price: Number,
//       total: Number,
//     },
//   ],

//   discounts: {
//     scheme: Number,
//     cashDiscount: Number,
//   },

//   totalAmount: Number,
//   netAmount: Number,

//   salesmanId: { type: mongoose.Schema.Types.ObjectId, ref: "Salesman" },

//   billingDate: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Billing", billingSchema);
