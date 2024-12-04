const BookingModel=require("../Models/Booking")
const ListingModel=require("../Models/Listing")
const UserModel=require("../Models/User")

const getTripList=async(req,res)=>{
    try{
      const {userId}=req.params
      const trips=await BookingModel.find({customerId:userId}).populate("customerId hostId listingId")
      res.status(202).send(trips)
    }
    catch(err){
       res.status(404).send({message:"can not find trips",error:err.message})
    }
}

const addListingToWishList=async(req,res)=>{
  try{
    const{userId,listingId}=req.params
    const user=await UserModel.findById(userId)
    const listing=await ListingModel.findById(listingId).populate("creator")
    const favouriteListing=user.wishList.find((items)=>items._id.toString()===listingId)
    if(favouriteListing){
     user.wishList= user.wishList.filter((items)=>items._id.toString()!==listingId)
      await user.save()
      res.status(200).send({message:"Listing is removed from wishList",wishList:user.wishList})
    }
    else{
      user.wishList.push(listing)
      await user.save()
      res.status(200).send({message:"Listing is added to wishList",wishList:user.wishList})

    }
  }catch(err){
     console.log(err)
     res.status(404).send({error:err.message})
  }
}

const propertyList=async(req,res)=>{
  try{
    const {userId}=req.params
    const properties=await ListingModel.find({creator:userId}).populate("creator")
    res.status(202).send(properties)
  }
  catch(err){
     res.status(404).send({message:"can not find Properties",error:err.message})
  }
}

const reservationList=async(req,res)=>{
  try{
    const {userId}=req.params
    
    const booking=await BookingModel.find({hostId:userId}).populate(["customerId","listingId","hostId"])
    res.status(202).send(booking)
  }
  catch(err){
    console.log(err)
     res.status(404).send({message:"can not find reservation",error:err.message})
  }
}

module.exports={getTripList,addListingToWishList,propertyList,reservationList}