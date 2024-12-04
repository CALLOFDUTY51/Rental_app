const router=require("express").Router()


const bookingController=require("../Controllers/Booking")

router.post('/create',bookingController.createBooking)



module.exports=router