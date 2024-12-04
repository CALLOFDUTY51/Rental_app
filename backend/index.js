const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const cors = require("cors");

const authRoute = require("./Route/auth");
const listingRoute = require("./Route/Listing");
const bookingRoutes = require("./Route/Booking");
const userRoutes = require("./Route/user");

// Allowed Origins for both local and production environments
const allowedOrigins = [
  "http://localhost:5173",  // Local development URL
  "https://rental-app-one-brown.vercel.app/"  // Replace with your actual production frontend URL
];

// Enable CORS with dynamic origin handling
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/auth", authRoute);
app.use("/properties", listingRoute);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
  dbName: "Dream_Nest"
}).then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
}).catch((err) => {
  console.log(err + " did not connect");
});
