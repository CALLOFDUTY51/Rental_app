const BookingModel = require("../Models/Booking");

const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new BookingModel({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).send(newBooking);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Fail to create a new Bookings", error: err.message });
  }
};

module.exports = { createBooking };
