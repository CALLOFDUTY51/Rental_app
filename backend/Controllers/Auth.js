const User=require("../Models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const profileImageUpload=async (req,res)=>{
    try{

        console.log(req.body)
        
        const {firstName,lastName,email,password,profileImagePath}=req.body
        
        
        
        
        if(profileImagePath==""){
            return res.status(400).send("no file uploaded")
        }
        

        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(409).send({message:"user already exists"})
        }
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            profileImagePath
        })
        await newUser.save();

        res.status(200).send({message:"user registered",user:newUser})
    }
    catch(err){
         console.log(err)
         res.status(500).send({message:"registration failed",error:err.message})
    }
}
const checkLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;

    const user=await User.findOne({email})

    if(!user){
        return res.status(409).send({message:"user dosen't exists"})
    }
    const isMatch= bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).send({message:"wrong password"})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({token,user})
    }
    catch(err){
       res.status(500).send({message:"me wrong"})
       console.log("me error")
    }
}

module.exports={profileImageUpload,checkLogin}