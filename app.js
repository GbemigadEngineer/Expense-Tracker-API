const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());

// Logger middleware for logging requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());

// Router Middlewares
// Auth router
app.use("/api/v1/auth", authRoutes);

// user Router
app.use("/api/v1/expenser/user", userRoutes);

// Global error handler
app.use(errorHandler);

// export appp
module.exports = app;
