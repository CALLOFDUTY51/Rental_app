import React, { useState } from 'react'
import "../Styles/Register.scss"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"

function RegistrationPage() {
    

    const navigate=useNavigate();

    const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

    const [formData,setFormData] =useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        profileImagePath:""
    }) 

    const wrongpass=<> <p style={{color:"red"}}> password not matched </p></>

    const [matchPassword,setMatchPassword]=useState(true);

    const handleChange=(e)=>{
       const {name,value}=e.target;
       
       

       setFormData({
        ...formData,
        [name]:value,
        
       })
       console.log(formData);
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

      if(formData.password===formData.confirmPassword){
        setMatchPassword(true)
      }
      else{
        setMatchPassword(false)
      }
      

      if (!image) {
        alert("Please select an image to upload");
        return;
      }

      const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "Rental_preset");
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


    axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,imageData)
    .then((res)=>{
        const updatedFormData = { ...formData, profileImagePath: res.data.url }
        let url="http://localhost:9000/auth/register";
        axios.post(url,updatedFormData).then((res)=>{
            console.log(res);
            navigate("/login")

        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log("my error" ,err)
    })

    console.log(formData)
      
      
        
        
    }

    let imagePreview = null;

if (image) {
    imagePreview = (
        <img 
            src={URL.createObjectURL(image)} 
            alt="profile-photo" 
            style={{maxWidth: "80px"}} 
        />
    );
}

  return (
    <div className='register'>
        <div className="register_content">
            <form className='register_content_form' onSubmit={handleSubmit}>
                <input type="text" value={formData.firstName} placeholder='FirstName' name='firstName' onChange={handleChange} required/>
                <input type="text" value={formData.lastName} placeholder='LastName' name='lastName' onChange={handleChange} required/>
                <input type="email" value={formData.email} placeholder='Email' name='email' onChange={handleChange} required/>
                <input type="password" value={formData.password} placeholder='Password' name='password' onChange={handleChange} required/>
                <input type="password" value={formData.confirmPassword} placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} required/>
                {(!matchPassword && wrongpass)}
                <input id='image'  type="file" name='profileImage' accept='image/' style={{display:'none'}} onChange={(e)=>{setImage(e.target.files[0])}} required />
                <label htmlFor='image'>
                    <img src="/assets/addImage.png" alt="add profile photo" />
                    <p>Upload Your Photo</p>
                </label>
                <div>
                    {imagePreview}
                </div>
                <button type='submit'>Register</button>
            </form>
            <Link to="/login">Already have an account? Login Here</Link>
        </div>
    </div>
  )
}

export default RegistrationPage