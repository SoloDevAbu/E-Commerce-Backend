const {Router} = require("express");
const UserMiddleware = require("../middleware/user.middleware");
const { allOrders, newOrder, updateOrder, deleteOrder } = require("../controller/order.controller");
const router = Router();

router.get("/products", UserMiddleware, allOrders);
router.post("/products", UserMiddleware, newOrder);
router.put("/products", UserMiddleware, updateOrder);
router.delete("/products", UserMiddleware, deleteOrder);

module.exports = router;