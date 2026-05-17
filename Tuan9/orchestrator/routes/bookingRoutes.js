const express = require("express");
const {
  bookTour,
  getTours,
  getTourById,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getTourById);
router.post("/book", bookTour);

module.exports = router;