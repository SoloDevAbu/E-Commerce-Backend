const { Router } = require("express");
const { registerUser, getUserProfile, updateUserProfile } = require("../controller/user.controller");
const UserMiddleware = require("../middleware/user.middleware");
const router = Router();

router.post("/signup", registerUser);
router.get("/profile",UserMiddleware, getUserProfile);
router.put("/profile",UserMiddleware, updateUserProfile);

module.exports = router;