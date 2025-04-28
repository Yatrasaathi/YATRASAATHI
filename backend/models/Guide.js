const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const guideSchema = new  mongoose.Schema({
    fullName:{
        type:String,
        required: true,
        trim: true,
    },
   age:{
      type:Number,
      require: true,
      trim:true,
    },
    gender:{
        type:String,
        require: true,
        enum: ['male', 'female', 'others'],
        trim:true,
    },
    contact:{
        type:Number,
        require: true,
        trim:true,
    },
    languages:{
        type:String,
        require: true,
        trim:true,
    },
    state:{
        type:String,
        require: true,
        trim:true,
    },
    city: {
        type: String,
        required: true,  // Ensure a city is provided for each guide
        trim: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/,"please enter a valid email address"],
    },
    password:{
        type:String,
        required: true,
        minLength: 6,  
    },
    aadhar :{
        type:Number,
        require: true,
        unique: true,
        trim:true,
    },
    profilePic: {
        type: String, // this will store the image URL or file path
        default: "",  // empty if not uploaded yet
    },
    charge: {
        type: Number,
        default: 1000 // or let them set it
    },
    upi:{
        type:String,
        require: true,
        trim:true,
    },
    role:{
        type:String,
        enum:["tourist","guide","admin"],
        default: "guide",
    },
},
{timestamps : true}
);

//Password Hash middleware
guideSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

//match user entered password to hashed password

guideSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model("Guide", guideSchema);
