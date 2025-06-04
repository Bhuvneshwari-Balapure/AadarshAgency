const express = require("express");
const router = express.Router();
const productCtrl = require("../Controller/ProductCtrl");
const upload = require("../config/multer.js");
router.post("/", upload.single("productImg"), productCtrl.createProduct);
router.get("/", productCtrl.getProducts); // GET all products with optional filters
router.delete("/:id", productCtrl.deleteProduct); // DELETE a product
router.put("/:id", productCtrl.updateProduct); // UPDATE a product
router.get("/update-product-quantity", productCtrl.UpdateProductQuantity);
module.exports = router;
