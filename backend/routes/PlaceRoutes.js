const express = require("express");
const Place= require("../models/Place");
const {protect,admin} = require("../middleware/authMiddleware");


const router = express.Router();

//@route POST/api/place
//@desc create a new place
//@access private/admin
router.post("/",protect,admin,async(req,res)=>{
    try {
        const{
            name,
            description,
            images,
            tags,
            dimension,
        }=req.body;
        const place = new Place({
            name,
            description,
            // images,
            tags,
            dimension,
            user: req.user._id,//reference to the admin user who create it
    });
    const createdplace = await place.save();
    res.status(201).json(createdplace);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;