const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name:String,
    description:String,
    images:{
            url:String,
            altText: String,    
        },    
    tags:[String],
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true,
    // },
    // metaTitle:{
    //     type:String,
    // },
    // metaDescription:{
    //     type:String,
    // },
    // metaKeywords:{
    //     type:String,
    // },
    // dimension:{
    //     length:Number,
    //     width:Number,
    //     height:Number,
    // },
    // weight:Number,
});

module.exports = mongoose.model("Place",placeSchema);