const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const guideRouter = require("./routes/guideRoutes");
const adminRouter = require("./routes/adminRoutes");
const tripRouter = require("./routes/tripRoutes");
const packageRoutes = require("./routes/packageRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend"), { extensions: ['html'] }));
app.use("/uploads", express.static("uploads"));



app.use((req, res, next) => {
    console.log("Request URL:", req.url);
    next();
  });

dotenv.config();

const PORT = process.env.PORT || 3000;

//conect to mongodb
connectDB();

app.get("/",(req,res) =>{
    res.send("WELCOME TO YATRASAATHI API");
});

//API Routes
app.use("/api/users",userRouter);
app.use("/api/guides",guideRouter);
app.use("/api/admin",adminRouter);
app.use("/api/TripDetails",tripRouter);
app.use("/api/packages", packageRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(PORT,() =>{
    console.log(`server is running on http://localhost:${PORT}`);
});