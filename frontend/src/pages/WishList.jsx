import React from 'react'
import "../Styles/List.scss"
import { useSelector } from 'react-redux'
import Navbar from '../compnents/Navbar'
import ListingCards from '../compnents/ListingCards'
import Footer from '../compnents/footer'

function WishList() {
    const wishList=useSelector((state)=>state.user.wishList)

  return (
     <>
     <Navbar/>
     <h1 className="title-list">Your WishList</h1>
     <div className="list">
     {wishList?.map(
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

export default WishList