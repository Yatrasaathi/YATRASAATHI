const express = require("express");
const jwt = require("jsonwebtoken");
//const {protect} = require("../middleware/authMiddleware");
//const dotenv = require("dotenv")

const router = express.Router();

///@route POST /api/admin/login
//@desc Authenticate admin
//@access public

router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      // Set your static admin email and password
      const adminEmail = process.env.ADMIN_EMAIL || "admin@yatrasaathi.com";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin@123";
      const adminRole = "admin";
  
      // Validate credentials
      if (email !== adminEmail || password !== adminPassword || role !== adminRole) {
        return res.status(400).json({ message: "Invalid admin credentials" });
      }
  
      // Create JWT payload
      const payload = { admin: { id: "admin-001" } }; // Can be any static id
  
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
        if (err) throw err;
  
        res.json({
          admin: {
            _id: "admin-001",
            email: adminEmail,
            role: adminRole,
          },
          token,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  
module.exports = router;