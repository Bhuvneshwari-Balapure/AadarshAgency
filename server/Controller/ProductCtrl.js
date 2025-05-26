const Product = require("../Models/ProductModel");

// POST /api/products - Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      companyId,
      categoryId,
      subCategoryId,
      productName,
      primaryUnit,
      primaryQty,
      secondaryUnit,
      secondaryQty,
      primaryPrice,
      secondaryPrice,
      availableQty,
      hsnCode,
      gstPercent,
    } = req.body;

    // Basic validation (add more if needed)
    if (!companyId || !categoryId || !subCategoryId || !productName) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newProduct = new Product({
      companyId,
      categoryId,
      subCategoryId,
      productName,
      primaryUnit,
      primaryQty,
      secondaryUnit,
      secondaryQty,
      primaryPrice,
      secondaryPrice,
      availableQty,
      hsnCode,
      gstPercent,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Server error." });
  }
};

// GET /api/products - Get all products (optionally filtered)
const getProducts = async (req, res) => {
  try {
    const { companyId, categoryId, subCategoryId } = req.query;

    const filter = {};
    if (companyId) filter.companyId = companyId;
    if (categoryId) filter.categoryId = categoryId;
    if (subCategoryId) filter.subCategoryId = subCategoryId;

    const products = await Product.find(filter)
      .populate("companyId", "name")
      .populate("categoryId", "cat")
      .populate("subCategoryId", "subCat")
      .sort({ lastUpdated: -1 });

    const formattedProducts = products.map((p) => ({
      ...p.toObject(),
      categoryName: p.categoryId?.cat || null,
      subCategoryName: p.subCategoryId?.subCat || null,
      name: p.companyId?.name || null,
    }));

    res.status(200).json(formattedProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error." });
  }
};
const UpdateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product || product.availableQty < quantity) {
      return res.status(400).json({ message: "Insufficient stock." });
    }

    product.availableQty -= quantity;
    await product.save();

    res.json({ message: "Quantity updated successfully.", product });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  UpdateProductQuantity,
};
