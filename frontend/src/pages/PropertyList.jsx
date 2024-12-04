import React, { useEffect, useState } from 'react'
import "../Styles/List.scss"
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../compnents/Navbar'
import ListingCards from '../compnents/ListingCards'
import { setPropertyList } from '../redux/state'
import Loader from '../compnents/Loader'
import axios from "axios"
import Footer from '../compnents/footer'

function PropertyList() {
    const user=useSelector((state)=>state.user)
    const propertyList=user?.propertyList;
    const[loading,setLoading]=useState(true)
    const dis=useDispatch()

    const getPropertyList=()=>{
      const apiUrl = import.meta.env.VITE_API_URL;  // Access the environment variable
const url = `${apiUrl}/users/${user._id}/properties`;  // Combine with the dynamic user ID

        axios.get(url)
        .then((res)=>{
           dis(setPropertyList(res.data))
           setLoading(false)
        }).catch((err)=>{
            console.log("fetch failed",err.message)
        })
    }

    useEffect(()=>{
        getPropertyList()
    },[])

  return (
    loading ?<Loader/>:
     <>
     <Navbar/>
     <h1 className="title-list">Your Property List</h1>
     <div className="list">
     {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCards
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
     </div>
     <Footer/>
     </>
  )
}

export default PropertyList