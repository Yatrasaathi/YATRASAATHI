const mongoose = require("mongoose");

const TripDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    //   package: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Package',
    //   },
    //   guideId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Guide',
    //   },
      tripdate:{
        type:String,
        required: true,
        trim: true,
    },
    duration:{
        type:String,
        required: true,
        trim: true,
    },
    starttime:{
        type:String,
        required: true,
        trim: true,
    },
    guide:{
      type:String,
      required: true,
      trim: true,
    },
    guideCharges:{
        type:Number,
        required: true,
        trim: true,
    },
    members:{
        type:Number,
        required: true,
        trim: true,
    },
},
{timestamps : true}
);

module.exports = mongoose.model("TripDetails", TripDetailsSchema);