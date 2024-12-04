import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Styles/Login.scss"
import {useDispatch} from "react-redux";
import { setLogin } from '../redux/state';
import axios from "axios"

function LoginPage() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const navigate =useNavigate()
  const dis=useDispatch()
  const handleSumbit=async(e)=>{
    e.preventDefault()
    const apiUrl = import.meta.env.VITE_API_URL;  // Use Vite's environment variable syntax
    const url = `https://rental-app-vc3y.onrender.com/auth/login`;
    
      axios.post(url,{email,password}).then((res)=>{
        console.log(res.data)
       const loggedIn=res.data;
       if(loggedIn){
        dis(
          setLogin({
            user:loggedIn.user,
            token:loggedIn.token
          })
        )
        navigate("/")
       }
      }).catch((err)=>{
        console.log("login failed",err.message)
      })
    
  }
  return (
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSumbit}>
          <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
          <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
          <button type='Sumbit'>Log In</button>
        </form>
        <Link to="/register">Dont Have an account? Sign in here</Link>
      </div>
    </div>
  )
}

export default LoginPage