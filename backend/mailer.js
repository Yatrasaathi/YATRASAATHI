// /mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other service
  host:"smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use app password if 2FA is on
  },
});

const sendLoginConfirmation = async (email,fullName) => {
  const mailOptions = {
    from: {
        name:"YATRASAATHI",
        address:process.env.EMAIL_USER,
    },
    to: email,
    subject: "Login Confirmation - YatraSaathi",
    text: `Hello ${fullName},\n\nWelcome to Yatra Saathi! We're excited to have you on board as part of a vibrant travel community. Get ready to discover hidden gems, share unforgettable stories, and be part of experiences that truly inspire. Your journey with us begins now!      
            \nHappy Travels,
            \nThe YatraSaathi Team.`,
  };

  return transporter.sendMail(mailOptions);
};

const sendTripBookingConfirmation = async (email, fullName, tripdate, duration, starttime, guide) => {
  const mailOptions = {
    from: {
      name: "YATRASAATHI",
      address: process.env.EMAIL_USER,
    },
    to: email,
    subject: "Trip Booking Confirmation - YatraSaathi",
    text: `Hello ${fullName},

Your trip has been successfully booked on YatraSaathi.

📅 Date: ${tripdate}
⏰ Start Time: ${starttime}
🕒 Duration: ${duration}
👨‍💼 Guide: ${guide}

Please wait while your guide confirms the booking. We’ll notify you once it's confirmed.

Thank you for choosing YatraSaathi!

Safe Travels!`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendLoginConfirmation,
  sendTripBookingConfirmation,
};

