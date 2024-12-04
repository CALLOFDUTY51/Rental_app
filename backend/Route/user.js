const router=require("express").Router()
const userController=require("../Controllers/user")

router.get("/:userId/trips",userController.getTripList)
router.patch("/:userId/:listingId",userController.addListingToWishList)
router.get("/:userId/properties",userController.propertyList)
router.get("/:userId/reservation",userController.reservationList)
module.exports=router