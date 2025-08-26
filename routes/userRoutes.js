const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

// Create router
const router = express.Router();

router.route("/").get(protect, getAllUser);

router
  .route("/:id")
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

// Export router
module.exports = router;
