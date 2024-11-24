const {Router} = require("express");
const UserMiddleware = require("../middleware/user.middleware");
const { allOrders, newOrder, updateOrder, deleteOrder } = require("../controller/order.controller");
const router = Router();

router.get("/products", UserMiddleware, allOrders);
router.post("/products/:productId", UserMiddleware, newOrder);
router.put("/products/:productId", UserMiddleware, updateOrder);
router.delete("/products/:productId", UserMiddleware, deleteOrder);

module.exports = router;