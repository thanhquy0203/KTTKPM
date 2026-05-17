const axios = require("axios");
const BookingResult = require("../models/BookingResult");

const userServiceUrl = process.env.USER_SERVICE_URL;
const tourServiceUrl = process.env.TOUR_SERVICE_URL;
const bookingServiceUrl = process.env.BOOKING_SERVICE_URL;
const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;

const getTours = async (req, res) => {
  try {
    const response = await axios.get(`${tourServiceUrl}/tours`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({ success: false, error: error.message });
  }
};

const getTourById = async (req, res) => {
  try {
    const response = await axios.get(`${tourServiceUrl}/tours/${req.params.id}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({ success: false, error: error.message });
  }
};

const bookTour = async (req, res) => {
  // Map đúng tên trường từ Frontend gửi lên: user_id, tour_id, slots, amount
  const { user_id, tour_id, slots, amount } = req.body;

  try {
    // 1. Validate User
    const userRes = await axios.get(`${userServiceUrl}/users/${user_id}`);
    const user = userRes.data.data;

    // 2. Get Tour Detail
    const tourRes = await axios.get(`${tourServiceUrl}/tours/${tour_id}`);
    const tour = tourRes.data.data;

    // 3. Create Booking
    const bookingRes = await axios.post(`${bookingServiceUrl}/bookings`, {
      user_id,
      tour_id,
      slots,
      status: "PENDING"
    });
    const booking = bookingRes.data;
    const bookingId = booking.id || booking.bookingId;

    // 4. Payment
    const paymentRes = await axios.post(`${paymentServiceUrl}/payments`, {
      booking_id: bookingId,
      amount: amount
    });
    const payment = paymentRes.data;

    // 5. Wrap result
    const result = new BookingResult({
      user,
      tour,
      bookingId,
      paymentStatus: payment.status || "SUCCESS"
    });

    return res.status(200).json({
      status: "SUCCESS",
      message: "Đặt tour thành công",
      details: result
    });

  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({
      status: "FAILED",
      message: "Workflow đặt tour thất bại",
      error: error.response?.data || error.message
    });
  }
};

module.exports = { bookTour, getTours, getTourById };