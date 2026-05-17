require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/book-tour", bookingRoutes); // Endpoint: /book-tour/book

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Orchestrator running on http://0.0.0.0:${PORT}`);
});