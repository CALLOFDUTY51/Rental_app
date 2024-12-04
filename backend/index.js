const express =require("express")
const app=express();
const mongoose=require("mongoose")
const dotenv =require("dotenv").config();
const cors=require("cors")

const authRoute=require("./Route/auth")
const listingRoute=require("./Route/Listing")
const bookingRoutes=require("./Route/Booking")
const userRoutes=require("./Route/user")


const allowedOrigins = [
    "http://localhost:5173",  // Local development URL
    "https://your-frontend-url.vercel.app"  // Production frontend URL (replace with your actual URL)
  ];
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);  // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"));  // Block the request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE","Patch", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use("/auth",authRoute);
app.use("/properties",listingRoute)
app.use("/bookings",bookingRoutes)
app.use("/users",userRoutes)


const PORT=9000
mongoose.connect(process.env.MONGO_URL,{
    dbName : "Dream_Nest"})
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server running")
    })
})
.catch((err)=>{
    console.log(err+" did not connect")
})