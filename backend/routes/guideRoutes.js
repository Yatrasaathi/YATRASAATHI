//to connect user's registration and login pages
const express = require("express");
const Guide = require("../models/Guide");
const jwt = require("jsonwebtoken");
const { sendLoginConfirmation } = require("../mailer");
const {protect} = require("../middleware/authMiddleware");


const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 171234123.png
    }
});
const upload = multer({ storage: storage });

//@route POST /api/guides/register
//@desc register a new guides
//@access public

router.post("/register",async(req,res)=>{
    const {fullName,age,gender,email ,password ,languages,contact ,state,city,aadhar,upi} = req.body;
    try{
        //registration logic
        let guide = await Guide.findOne({email});

        if(guide)return res.status(400).json({message:"Guide already exists"});

        guide = new Guide({fullName ,age,gender,email, password,languages,contact,state,city,aadhar,upi});
        await guide.save();

       //create JWT payload
       const payload = {guide:{id:guide._id ,role:guide.role}};

       //sign and return the token along with data
       jwt.sign(payload ,process.env.JWT_SECRET,
        {expiresIn:"2h"},
        (err , token) =>{
        if(err) throw err;
        res.status(201).json({
            message: "Guide registered successfully!",
            guide:{
                _id:guide._id,
                fullName:guide.fullName,
                email:guide.email,
                age:guide.age,
                gender:guide.gender,
                languages:guide.languages,
                contact:guide.contact,
                aadhar:guide.aadhar,
                address:guide.address,
                upi:guide.upi,
                role:guide.role,
            },
            token,
            
        });
       });
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
});
// backend/routes/guideRoutes.js

///@route POST /api/guides/login
//@desc Authenticate guide
//@access public

router.post("/login",async(req,res)=>{
       const{email,password,role} =req.body;
       try {
        //find the user be email
        let guide = await Guide.findOne({email});

        if(!guide)return res.status(400).json({message:"invalid credentials"});
        const isMatch = await guide.matchPassword(password);
        const isMatch1 = guide.role === role ;

        if(!isMatch)return res.status(400).json({message:"invalid credentials"});
        if(!isMatch1)return res.status(400).json({message:"invalid credentials"});
        
        // Send Login Confirmation email
        await sendLoginConfirmation(guide.email, guide.fullName);

        //create JWT payload
         const payload = {guide:{id:guide._id }};

         //sign and return the token along with data
         jwt.sign(payload ,
            process.env.JWT_SECRET,
          {expiresIn:"2h"},
          (err , token) => {
          if(err) throw err;
  
          //send the user and token in response
          res.json({
              guide:{
                  _id:guide._id,
                  fullName:guide.fullName,
                  email:guide.email,
                  role:guide.role,
              },
              token,
          });
          });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
       }
});

//@route GET/api/guides/profile
//@desc get logged-in guide's profile(protected route)
//@access private
router.get("/profile",protect, async(req,res) =>{
    res.json(req.guide);
});

// @route GET /api/guides
// @desc Get all guides (filtered by city if provided)
// @access public
router.get("/", async (req, res) => {
    try {
        const { city } = req.query;

        // Make sure your model has 'city' field
        const guides = await Guide.find({ city: city });

        // Transform data for frontend
        const formattedGuides = guides.map(guide => ({
            //_id: guide._id,
            name: guide.fullName,
            image: guide.profilePic || "/default.jpg",
            city: guide.city,
            rating: 4.5, // you can customize
            languages: guide.languages,
            charge: guide.charge || 1000 // default if not stored
        }));

        res.json(formattedGuides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch guides" });
    }
});

//@route POST /api/guides/upload-photo/:id
//@desc Upload/Update profile picture
//@access public (or protected if login is required)
router.post("/upload-photo/:id", upload.single("profilePic"), async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) {
            return res.status(404).json({ message: "Guide not found" });
        }

        guide.profilePic = `/uploads/${req.file.filename}`; // Store relative path
        await guide.save();

        res.json({ message: "Profile picture uploaded", profilePic: guide.profilePic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
});


module.exports = router;