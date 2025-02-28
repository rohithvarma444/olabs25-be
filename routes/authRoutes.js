const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getUserProfile);

module.exports = router;