const Purchase = require("../Models/PurchaseModel");
const Product = require("../Models/ProductModel");
// Create Purchase
// exports.createPurchase = async (req, res) => {
//   try {
//     const newPurchase = new Purchase(req.body);
//     const saved = await newPurchase.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.createPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    const savedPurchase = await newPurchase.save();

    // Find the product and update its quantity
    const product = await Product.findById(savedPurchase.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.availableQty = savedPurchase.quantity; // Set quantity on purchase
    await product.save();

    res.status(201).json(savedPurchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("vendorId", "name")
      .populate("companyId", "name")
      .populate("productId", "productName");
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One Purchase
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate("vendorId", "name")
      .populate("companyId", "name")
      .populate("productId", "productName");
    if (!purchase) return res.status(404).json({ error: "Not found" });
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Purchase
exports.updatePurchase = async (req, res) => {
  try {
    const updated = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("vendorId", "name")
      .populate("companyId", "name")
      .populate("productId", "productName");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Purchase
exports.deletePurchase = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
