const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Place = require("./models/Place");
const User = require("./models/User");
const placeDet = require("./Data/placeDet");

dotenv.config();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

//function to seed data
const seedData = async () =>{
    try {
        //clear existing data
        await Place.deleteMany();
        await User.deleteMany();
        //crete a default admin user
        const createUser = await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin",
        });

        //Assign the default user Id to each element
        const userID = createUser._id;

        const samplePlace = place.map((place)=>{
            return{...place,user: userID};
        });

        //Insert the places into the database
        await Place.insertMany(samplePlace);

        console.log("Place data seeded successfully");
        process.exit();

    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);
    }
};

seedData();