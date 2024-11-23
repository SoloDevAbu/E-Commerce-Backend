const { Router } = require("express");
const { getAllProduct, createNewProduct, updateProductById, deleteProductById } = require("../controller/product.controller");
const AdminMiddleware = require("../middleware/admin.middleware");
const router = Router();

router.get("/products", getAllProduct);
router.post("/newProduct", AdminMiddleware, createNewProduct);
router.put("/products/:productId", AdminMiddleware, updateProductById);
router.delete("/products/:productId", AdminMiddleware, deleteProductById);

module.exports = router;