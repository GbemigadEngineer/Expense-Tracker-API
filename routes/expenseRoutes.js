const express = require("express");
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(protect);

router.route("/").get(getExpenses).post(createExpense);

router.route("/:id").patch(updateExpense).delete(deleteExpense);

module.exports = router;
