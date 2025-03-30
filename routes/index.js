const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
const auth = require("../middleware/authMiddleware");

const authRoutes = require("./auth");

router.use("/auth", authRoutes);
router.use("/", require("./swagger"));
router.use("/categories", require("./category"));

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smart TV
 *               price:
 *                 type: number
 *                 example: 599.99
 *               description:
 *                 type: string
 *                 example: A 55-inch 4K Smart TV with HDR support.
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth, products.getProducts);
router.post("/", auth, products.createProduct);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Smart TV
 *               price:
 *                 type: number
 *                 example: 649.99
 *               description:
 *                 type: string
 *                 example: A 55-inch 4K Smart TV with HDR and Dolby Vision support.
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get("/:id", auth, products.getProductById);
router.put("/:id", auth, products.updateProduct);
router.delete("/:id", auth, products.deleteProduct);

module.exports = router;
