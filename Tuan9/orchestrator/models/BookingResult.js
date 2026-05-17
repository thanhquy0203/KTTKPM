class BookingResult {
  constructor({ user, tour, bookingId, paymentStatus }) {
    this.user = user;
    this.tour = tour;
    this.bookingId = bookingId;
    this.paymentStatus = paymentStatus;
  }
}

module.exports = BookingResult;