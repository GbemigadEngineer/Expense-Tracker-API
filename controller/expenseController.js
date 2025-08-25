const Expense = require("../model/expenseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Helper function to create date filters
const getDateFilter = (filterType, value, startDate, endDate) => {
  const now = new Date();
  let filter = {};

  switch (filterType) {
    case "days":
      const days = parseInt(value) || 7;
      filter = {
        date: { $gte: new Date(now.getTime() - days * 24 * 60 * 60 * 1000) },
      };
      break;
    case "weeks":
      const weeks = parseInt(value) || 1;
      filter = {
        date: {
          $gte: new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000),
        },
      };
      break;
    case "months":
      const months = parseInt(value) || 1;
      filter = {
        date: { $gte: new Date(now.setMonth(now.getMonth() - months)) },
      };
      break;
    case "custom":
      if (!startDate || !endDate) {
        throw new AppError(
          "Start and end date are required for custom filter",
          400
        );
      }
      filter = { date: { $gte: new Date(startDate), $lte: new Date(endDate) } };
      break;
    default:
      break;
  }

  return filter;
};

// Get all expenses with optional filtering
const getExpenses = catchAsync(async (req, res, next) => {
  const {
    period,
    value,
    startDate,
    endDate,
    category,
    currency,
    minAmount,
    maxAmount,
  } = req.query;

  // Build base query with user filter
  let query = { user: req.user._id };

  // Handle date filtering
  if (period) {
    const dateFilter = getDateFilter(period, value, startDate, endDate);
    query = { ...query, ...dateFilter };
  }

  // Add category filter if provided
  if (category) {
    query.category = category;
  }

  // Add currency filter if provided
  if (currency) {
    query.currency = currency;
  }

  // Add amount range filtering
  if (minAmount || maxAmount) {
    query.amount = {};
    if (minAmount) query.amount.$gte = parseFloat(minAmount);
    if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
  }

  const expenses = await Expense.find(query).sort({ date: -1 });

  res.status(200).json({
    status: "success",
    results: expenses.length,
    data: {
      expenses,
    },
  });
});

// Create new expense
const createExpense = catchAsync(async (req, res, next) => {
  const { amount, currency, category, note, date } = req.body;

  const expense = await Expense.create({
    amount,
    currency,
    category,
    note,
    date: date || Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      expense,
    },
  });
});

// Update expense
const updateExpense = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { amount, currency, category, note, date } = req.body;

  const expense = await Expense.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { amount, currency, category, note, date },
    { new: true, runValidators: true }
  );

  if (!expense) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

// Delete expense
const deleteExpense = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const expense = await Expense.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!expense) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
