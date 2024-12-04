const express =require("express")
const app=express();
const mongoose=require("mongoose")
const dotenv =require("dotenv").config();
const cors=require("cors")

const authRoute=require("./Route/auth")
const listingRoute=require("./Route/Listing")
const bookingRoutes=require("./Route/Booking")
const userRoutes=require("./Route/user")

app.use(cors());
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