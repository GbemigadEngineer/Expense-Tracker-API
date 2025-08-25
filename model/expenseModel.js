const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "INR",
        "AUD",
        "CAD",
        "CHF",
        "CNY",
        "SEK",
        "NZD",
        "NGN",
      ],
      default: "NGN",
    },
    category: {
      type: String,
      enum: [
        "Groceries",
        "Leisure",
        "Electronics",
        "Utilities",
        "Clothing",
        "Health",
        "Others",
      ],
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      maxlength: [100, "Note can't be more than 100 chracters long."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Expense must belong to a user"],
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
