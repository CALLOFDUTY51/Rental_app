import { useParams } from "react-router-dom"
import "../Styles/List.scss"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setListings } from "../redux/state"
import ListingCards from "../compnents/ListingCards"
import Navbar from "../compnents/Navbar"
import Footer from "../compnents/footer"

function SearchPage() {
    const[loading,setLoading]=useState(true);
    const {search}=useParams()
    const listings=useSelector((state)=>state.listings)
    const dis=useDispatch()
    const abc=()=>{
        let url =`http://localhost:9000/properties/search/${search}`

        axios.get(url).then((res)=>{
            dis(setListings({listings:res.data}))
            setLoading(false)
            console.log(listings)
        })
    }
    useEffect(()=>{
        abc()
    },[search])
  return (
    <>
     <Navbar/>
     <h1 className="title-list">Your Search</h1>
     <div className="list">
     {listings?.map(
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

export default SearchPage