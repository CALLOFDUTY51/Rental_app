const router=require("express").Router()

const multer=require("multer")



const authController=require("../Controllers/Auth")

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"public/uploads/")
    },
    filename:function (req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})



router.post("/register",authController.profileImageUpload)
router.post("/login",authController.checkLogin)


module.exports=router