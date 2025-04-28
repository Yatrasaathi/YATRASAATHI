//to connect user's registration and login pages
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware")
const {sendLoginConfirmation} = require("../mailer"); // adjust the path as needed

const router = express.Router();

//@route POST /api/users/register
//@desc register a new user
//@access public

router.post("/register",async(req,res)=>{
    const {fullName,age,gender,email ,password ,contact ,address,aadhar,upi} = req.body;
    try{
        //registration logic
        let user = await User.findOne({email});

        if(user)return res.status(400).json({message:"User already exists"});

        user = new User({fullName ,age,gender,email, password,contact,address,aadhar,upi});
        await user.save();

       //create JWT payload
       const payload = {user:{id:user._id ,role:user.role}};

       //sign and return the token along with data
       jwt.sign(payload ,process.env.JWT_SECRET,
        {expiresIn:"2h"},
        (err , token) =>{
        if(err) throw err;
       // res.json({ message: 'User registered successfully!', data: req.body });
        //send the user and token in response
        res.status(201).json({
            message: "User registered successfully!",
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                age:user.age,
                gender:user.gender,
                contact:user.contact,
                aadhar:user.aadhar,
                address:user.address,
                upi:user.upi,
                role:user.role,
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
// backend/routes/userRoutes.js

///@route POST /api/users/login
//@desc Authenticate user
//@access public

router.post("/login",async(req,res)=>{
       const{email , password} =req.body;
       try {
        //find the user be email
        let user = await User.findOne({email});

        if(!user)return res.status(400).json({message:"invalid credentials"});
        const isMatch = await user.matchPassword(password);

        if(!isMatch)return res.status(400).json({message:"invalid credentials"});
         
        //Send Login Confirmation email
        await sendLoginConfirmation(user.email, user.fullName);

        //create JWT payload
         const payload = {user:{id:user._id ,role:user.role}};

         //sign and return the token along with data
         jwt.sign(payload ,
            process.env.JWT_SECRET,
          {expiresIn:"2h"},
          (err , token) => {
          if(err) throw err;
  
          //send the user and token in response
          res.json({
              user:{
                  _id:user._id,
                  fullName:user.fullName,
                  email:user.email,
                  role:user.role,
              },
              token,
          });
          });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
       }
});

//@route GET/api/users/profile
//@desc get logged-in user's profile(protected route)
//@access private
router.get("/profile",protect, async(req,res) =>{
    res.json(req.user);
});

router.put('/update', protect, async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Update failed" });
    }
});

module.exports = router;