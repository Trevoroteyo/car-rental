import Booking from "../../models/Booking.js";

const bookCar = async (req, res) => {
  try {
    const { owner, user, car, pickupDate, returnDate, price } = req.body;

    // Basic validation
    if (!owner || !user || !car) {
      return res.status(400).json({
        success: false,
        message: "owner, user and car are required fields",
      });
    }

    const carBooking = new Booking({
      car,
      user,
      owner,
      pickupDate,
      returnDate,
      price,
    });

    await carBooking.save();

    res.status(201).json({
      success: true,
      message: "Car booked successfully",
      data: carBooking,
    });
  } catch (err) {
    console.error("Error booking car:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong while booking the car",
    });
  }
};

const myBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({
      user: userId,
    });

    if (!bookings || bookings === "") {
      return res.status(404).json({
        success: false,
        message: "No bookings found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookings found.",
      data: bookings,
    });
  } catch (err) {
    console.log(`Error fetching my bookings: ${err}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export { myBookings, bookCar };
