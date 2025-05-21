const express = require("express");
const router = express.Router();
const productCtrl = require("../Controller/ProductCtrl");

router.post("/", productCtrl.createProduct);
router.get("/", productCtrl.getProducts); // GET all products with optional filters

module.exports = router;
