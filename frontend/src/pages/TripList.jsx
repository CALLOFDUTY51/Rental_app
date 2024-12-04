import React, { useEffect, useState } from 'react'
import "../Styles/List.scss"
import Navbar from '../compnents/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setTripList } from '../redux/state'
import Loader from '../compnents/Loader'
import axios from "axios"
import ListingCards from '../compnents/ListingCards'
import Footer from '../compnents/footer'
function TripList() {
    const [loading,setLoading]=useState(true)
    const tripList=useSelector((state)=>state.user.tripList)
    const userId=useSelector(state=>state.user._id)

    const dis=useDispatch()

    const getTripList=()=>{
        const apiUrl = import.meta.env.VITE_API_URL;  // Access the environment variable
const url = `${apiUrl}/users/${userId}/trips`;  // Combine with the userId and endpoint

        axios.get(url).then((res)=>{
            const data=res.data
            dis(setTripList(data))
            setLoading(false)
        })
        .catch((err)=>{
            console.log("tripList failed" ,err.message)
        })
    }
    useEffect(()=>{
        getTripList()
    },[])
    return loading?<Loader/>:(
        <>
        <Navbar/>
        <h1 className='title-list'>Your Trip List</h1>
        <div className="list">
            {tripList?.map(({listingId,hostId,startDate,endDate,totalPrice,booking=true})=>(
                <ListingCards  
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking}
                />
            ))}
        </div>
        <Footer/>
        </>
    )
}

export default TripList