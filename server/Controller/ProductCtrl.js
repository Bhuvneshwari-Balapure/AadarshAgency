const Product = require("../Models/ProductModel");

// POST /api/products - Create a new product
const createProduct = async (req, res) => {
  console.log(req.body, "create Product");
  try {
    const {
      companyId,
      productName,
      // unit,
      mrp,
      salesRate,
      purchaseRate,
      availableQty,
      hsnCode,
      gstPercent,
      // categoryId,
      // subCategoryId,
      primaryUnit,
      secondaryUnit,
      primaryPrice,
      secondaryPrice,
    } = req.body;
    const productImg = req.file ? req.file.filename : null;

    // Basic validation (add more if needed)
    // if (!companyId || !categoryId || !subCategoryId || !productName) {
    //   return res.status(400).json({ error: "Missing required fields." });
    // }

    const newProduct = new Product({
      companyId,
      productName,
      productImg,
      // unit,
      mrp,
      salesRate,
      purchaseRate,
      availableQty,
      hsnCode,
      gstPercent,
      // categoryId,
      // subCategoryId,
      primaryUnit,
      secondaryUnit,
      primaryPrice,
      secondaryPrice,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating product:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Server error." });
  }
};

// GET /api/products - Get all products (optionally filtered)
const getProducts = async (req, res) => {
  try {
    // const { companyId, categoryId, subCategoryId } = req.query;
    const { companyId } = req.query;

    const filter = {};
    if (companyId) filter.companyId = companyId;
    // if (categoryId) filter.categoryId = categoryId;
    // if (subCategoryId) filter.subCategoryId = subCategoryId;

    const products = await Product.find(filter)
      .populate("companyId", "name")
      // .populate("categoryId", "cat")
      // .populate("subCategoryId", "subCat")
      .sort({ lastUpdated: -1 });

    const formattedProducts = products.map((p) => ({
      ...p.toObject(),
      // categoryName: p.categoryId?.cat || null,
      // subCategoryName: p.subCategoryId?.subCat || null,
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
// PUT /api/products/:id - Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    companyId,
    productName,
    // unit,
    mrp,
    salesRate,
    purchaseRate,
    availableQty,
    hsnCode,
    gstPercent,
    primaryUnit,
    secondaryUnit,
    primaryPrice,
    secondaryPrice,
  } = req.body;

  try {
    // Validation
    if (
      !companyId ||
      !productName ||
      // !unit ||
      primaryUnit === "" ||
      secondaryUnit === "" ||
      primaryPrice === "" ||
      secondaryPrice === "" ||
      mrp === "" ||
      salesRate === "" ||
      purchaseRate === ""
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    if (availableQty < 0 || mrp < 0 || salesRate < 0 || purchaseRate < 0) {
      return res
        .status(400)
        .json({ error: "Quantity and rates must be non-negative." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        companyId,
        productName,
        // unit,
        primaryUnit,
        secondaryUnit,
        primaryPrice,
        secondaryPrice,

        mrp,
        salesRate,
        purchaseRate,
        hsnCode,
        gstPercent,
        lastUpdated: Date.now(),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Server error." });
  }
};
// DELETE /api/products/:id - Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product deleted successfully." });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Server error." });
  }
};

// GET /api/products/:id - Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  UpdateProductQuantity,
  deleteProduct,
  getProductById,
};
