const {Router} = require("express");
const UserMiddleware = require("../middleware/user.middleware");
const { allProductInCart, addProductToCart, removeProductFromCart } = require("../controller/cart.controller");
const router = Router();

router.get("/products", UserMiddleware, allProductInCart);
router.post("/products/:productId", UserMiddleware, addProductToCart);
// router.put("/products/:productId", UserMiddleware, updateProductInCart);
router.delete("/products/:productId", UserMiddleware, removeProductFromCart);

module.exports = router;