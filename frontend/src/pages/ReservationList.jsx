import React, { useEffect, useState } from 'react'
import "../Styles/List.scss"
import Navbar from '../compnents/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setReservationList } from '../redux/state'
import Loader from '../compnents/Loader'
import axios from "axios"
import ListingCards from '../compnents/ListingCards'
import Footer from '../compnents/footer'
function ReservationList() {
    const [loading,setLoading]=useState(true)
    const reservationList=useSelector((state)=>state.user.reservationList)
    const userId=useSelector(state=>state.user._id)

    const dis=useDispatch()

    const getReservationList=()=>{
        axios.get(`http://localhost:9000/users/${userId}/reservation`).then((res)=>{
            const data=res.data
            console.log(res.data)
            dis(setReservationList(data))
            setLoading(false)
        })
        .catch((err)=>{
            console.log("reservation failed" ,err.message)
        })
    }
    useEffect(()=>{
        getReservationList()
    },[])
    return loading?<Loader/>:(
        <>
        <Navbar/>
        <h1 className='title-list'>Your Reservation List</h1>
        <div className="list">
            {reservationList?.map(({listingId,hostId,startDate,endDate,totalPrice,booking=true})=>(
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

export default ReservationList