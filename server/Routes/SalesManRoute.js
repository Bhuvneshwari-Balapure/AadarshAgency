const express = require("express");
const router = express.Router();
const salesCtrl = require("../Controller/SalesManCtrl");
const upload = require("../config/multer.js");

router.post("/", upload.single("photo"), salesCtrl.createSalesman);
router.get("/", salesCtrl.Display); // GET all products with optional filters

module.exports = router;
