const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Feedback = require("../models/Feedback");

// POST route for submitting feedback
router.post('/', upload.array('photoUpload', 5), async (req, res) => {
    try {
        const { rating, experience, guideRating } = req.body;
        const photoNames = req.files.map(file => file.filename);
        if (!experience) {
            return res.status(400).json({ message: "Experience field is required" });
        }
        const feedback = new Feedback({
            rating,
            experience,
            guideRating,
            photoUpload:photoNames
        });


        await feedback.save();
        res.status(200).json({ message: 'Feedback saved successfully!' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
