const { signup, login } = require("../controller/authController");

const express = require("express");

// Create Router
const router = express.Router();

// Routes

router.route("/signup").post(signup);
router.route("/login").post(login);

// Export Router
module.exports = router;
