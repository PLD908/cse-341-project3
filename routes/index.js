const express = require("express");
const router = express.Router();
const products = require("../controllers/products");

router.use('/', require('./swagger'));

router.use("/categories", require("./category"));

router.get("/", products.getProducts);
router.get("/:id", products.getProductById);
router.post("/", products.createProduct);
router.put("/:id", products.updateProduct);
router.delete("/:id", products.deleteProduct);

module.exports = router;
