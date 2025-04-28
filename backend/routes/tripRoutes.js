const express = require('express');
const TripDetails = require('../models/TripDetails');
const { sendTripBookingConfirmation } = require('../mailer');
const User = require('../models/User'); 

const router = express.Router();

// POST /api/TripDetails
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      guide,
      guideCharges,
      tripdate,
      duration,
      starttime,
      members
    } = req.body;

    // Basic validation
    if (!userId  || !guide || !tripdate || !duration || !starttime || !members) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const newTrip = new TripDetails({
      userId,
      guide,
      guideCharges: Number(guideCharges), // Ensure numeric value
      tripdate,
      duration,
      starttime,
      members
    });

    const storedTrip = await newTrip.save();

     // ✅ Send trip confirmation email
     const user = await User.findById(userId);
     if (user) {
       await sendTripBookingConfirmation(user.email, user.fullName, tripdate, duration, starttime, guide);
     }
 
    res.status(201).json({
      message: "Trip booked successfully",
      trip: storedTrip
    });

  } catch (error) {
    console.error("Failed to store trip data:", error);
    console.error("Payload received:", req.body);
    res.status(500).json({ message: "Server error. Could not save trip details." });
  }
});

module.exports = router;
