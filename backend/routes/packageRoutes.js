const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

// @route   POST /api/packages
// @desc    Create a new package
router.post("/", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create package" });
  }
});

// @route   GET /api/packages
// @desc    Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
});

// @route   GET /api/packages/:id
// @desc    Get a single package by ID
router.get("/:id", async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch package" });
  }
});

module.exports = router;
