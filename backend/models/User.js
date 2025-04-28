const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new  mongoose.Schema({
    fullName:{
        type:String,
        required: true,
        trim: true,
    },
   age:{
      type:String,
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
    address:{
        type:String,
        require: true,
        trim:true,
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
    upi:{
        type:String,
        require: true,
        trim:true,
    },
    role:{
        type:String,
        enum:["tourist","guide","admin"],
        default: "tourist",
    },
},
{timestamps : true}
);

//Password Hash middleware
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

//match user entered password to hashed password

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model("User", userSchema);
