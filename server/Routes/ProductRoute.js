const express = require("express");
const router = express.Router();
const productCtrl = require("../Controller/ProductCtrl");

router.post("/", productCtrl.createProduct);
router.get("/", productCtrl.getProducts); // GET all products with optional filters
router.get("/update-product-quantity", productCtrl.UpdateProductQuantity);
module.exports = router;
