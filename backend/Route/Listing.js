const router=require("express").Router()
const multer=require("multer")

const ListingContoller=require("../Controllers/Listing")


const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"public/uploads/")
    },
    filename:function (req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})


router.post("/create",upload.array("listingPhotos"),ListingContoller.createPlace)
router.get("/",ListingContoller.getListingbycategory)
router.get("/:listingId",ListingContoller.getListingDetails)
router.get("/search/:search",ListingContoller.getListingBySearch)

module.exports=router