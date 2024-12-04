import React, { useEffect, useState } from "react";
import "../Styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { facilities } from "../data";
import Navbar from '../compnents/Navbar'

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../compnents/Loader";
import { useSelector } from "react-redux";
import Footer from "../compnents/footer";

function ListingDetails() {

  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();

  const [listing, setListing] = useState(null);

  const getFeedListingDetails = async () => {
    let url = `http://localhost:9000/properties/${listingId}`;
    axios
      .get(url)
      .then((res) => {
        setListing(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("setListing failed", err.message);
      });
  };
  useEffect(() => {
    getFeedListingDetails();
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);

  const dayCount = Math.round(end - start) / (1000* 60 * 60 * 24);

  const customerId=useSelector((state)=>state?.user?._id)

  const handleSubmit=async()=>{
    const bookingForm={
      customerId,
      listingId,
      hostId:listing.creator._id,
      startDate:dateRange[0].startDate.toDateString(),
      endDate:dateRange[0].endDate.toDateString(),
      totalPrice:listing.price*dayCount 
    }
    const apiUrl = import.meta.env.VITE_API_URL;  // Access the environment variable
const url = `${apiUrl}/bookings/create`;      // Combine with the endpoint

    axios.post(url,bookingForm)
    .then((res)=>{
      navigate(`/${customerId}/trips`)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

  return loading ? (
    <Loader />
  ) : (
    <>
    <Navbar/>
    <div className="listing-details">
      <div className="title">
        <h1>{listing.title}</h1>
      </div>
      <div className="photos">
        {listing.listingPhotoPaths.map((item) => {
          return(
          <img
            src={item}
            alt="abc"
          />
        )})}
      </div>
      <h2>
        {listing.type} in {listing.city},{listing.province}, {listing.country}{" "}
      </h2>
      <p>
        {listing.guestCount} guests - {listing.bedroomCount}
        bedroom - {listing.bedCount}-bed -{listing.bathroomCount} bath
      </p>
      <hr />
      <div className="profile">
        <img
          src={listing.creator.profileImagePath}
          alt=""
        />
        <h3>
          Hosted by {listing.creator.firstName} {listing.creator.lastName}
        </h3>
      </div>
      <hr />
      <h3>Description</h3>
      <p>{listing.description}</p>
      <hr />

      <h3>{listing.highlight}</h3>
      <p>{listing.highlightDesc}</p>
      <hr />

      <div className="booking">
        <div>
          <h2>What this place offers?</h2>
          <div className="amenities">
            {listing.amenities[0].split(",").map((item, index) => {
              return (
              <div className="facility" key={index}>
                <div className="facility_icon">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </div>
                <p>{item}</p>
              </div>
           ) })}
          </div>
        </div>
        <div>
          <h2>How Long do you want to stay?</h2>
          <div className="date-range-calendar">
            <DateRange ranges={dateRange} onChange={handleSelect} />
            {dayCount > 1 ? (
              <h2>
                ${listing.price} X {dayCount} nights
              </h2>
            ) : (
              <h2>
                ${listing.price} X {dayCount} night
              </h2>
            )}
            <h2>Total Price: ${listing.price * dayCount}</h2>
            <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
            <p>End Date:{dateRange[0].endDate.toDateString()}</p>

            <button className="button" type="sumbit" onClick={handleSubmit}>
              BOOKING
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ListingDetails;
