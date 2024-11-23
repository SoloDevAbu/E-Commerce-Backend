const { Router } = require("express");
const AdminMiddleware = require("../middleware/admin.middleware");
const { registerAdmin, getAdminProfile, updateAdminProfile } = require("../controller/admin.controller");
const router = Router();

router.post("/signup", registerAdmin);
router.get("/profile", AdminMiddleware, getAdminProfile);
router.put("/profile", AdminMiddleware, updateAdminProfile);

module.exports = router;