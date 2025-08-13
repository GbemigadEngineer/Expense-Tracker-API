"use strict";
// Import modules
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = catchAsync(async (req, res, next) => {
  // 1. Extract username and password from the request body
  const { name, email, password, passwordConfirm } = req.body;
  // 2. Validate the input
  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError("Fill in all required information", 400));
  }
  // 3. If validation passes, createa new user
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  // 4.Send response

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  // 1. Get the user data from the req.body
  const { email, password } = req.body;

  // 2. Validate the data
  // 2a. Check if email and password are provided
  if (!email || !password) {
    return next(new AppError("Email, and password required", 400));
  }

  // 2b. Check if the user exists and if the password is correct
  const user = await User.findOne({ email }).select("+password");

  // 2ci. If the user does not exist or the password is incorrect return error message
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }
  // ps i'm using this error message so a hacker doesn't know if the username or password is wrong

  // 3. If the user exists and the password is correct, generate a jwt token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // 4. Send the response with the token and user data

  //4a. Send token to the response as a cookie
  res.cookie("loginToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set secure to true in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  // 4b. Send the response with the user data and token

  const userToken = process.env.NODE_ENV === "production" ? "" : token;
  res.status(200).json({
    status: "success",
    message: "Login successful",
    token: userToken,
    data: {
      user: {
        id: user._id,
        name: user.name,
      },
    },
  });
});

// export Controllers

module.exports = {
  signup,
  login,
};
