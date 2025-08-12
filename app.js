const express = require("express");
const morgan = require("morgan");

const app = express();

// middlewares
app.use(express.json());

// Logger middleware for logging requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Router Middlewares
// Auth router
app.use("api/v1/auth", authRoutes);

// user Router
app.use("/api/v1/expenser/user", userRoutes);

// export appp
module.exports = app;
