import React, { useState } from "react";
import { ArrowBackIosNew, ArrowForwardIos ,Favorite} from "@mui/icons-material";
import "../Styles/ListingCard.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setwishList } from "../redux/state";

function ListingCards({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking
}) {
  const navigate = useNavigate();

  const dis=useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };
  const goToNextSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };
  const user =useSelector((state)=>state.user)
  const wishList=user?.wishList || []

  const isLiked=wishList.find((item)=>item?._id===listingId)

  const patchWishList=(e)=>{
    e.stopPropagation()
    const apiUrl = import.meta.env.VITE_API_URL;  // Access the environment variable
const url = `${apiUrl}/users/${user?._id}/${listingId}`;  // Combine with user ID and listing ID

    axios.patch(url)
    .then((res)=>{
       dis(setwishList(res.data.wishList))
       console.log(res.data)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }
  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div className="slide">
              <img
                src={photo}
                alt=""
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>
        {city},{province},{country}
      </h3>
      <p>{category}</p>
      {!booking?(
        <>
        <p>{type}</p>
      <p>
        <span>${price}</span>per night
      </p>
        </>
      ):(
        <>
        <p>{startDate}-{endDate}</p>
      <p>
        <span>${totalPrice}</span> total
      </p>
        </>
      )}
      <button className="favorite" onClick={patchWishList} disabled={!user}>
        {isLiked ?(
          <Favorite sx={{color:"red"}}/>
        ):(
          <Favorite sx={{color:"white"}}/>
        )}
      </button>
    </div>
  );
}

export default ListingCards;
