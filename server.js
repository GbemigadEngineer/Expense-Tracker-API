const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  process.env.NODE_ENV === "production"
    ? console.log(`Server is running on port ${port}, in production mode`)
    : console.log(`Server is running on port ${port}, in development mode`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
