import React, { useEffect, useState } from 'react'
import "../Styles/List.scss"
import Loader from '../compnents/Loader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'
import axios from 'axios'
import Navbar from '../compnents/Navbar'
import ListingCards from '../compnents/ListingCards'
import Footer from '../compnents/footer'
function Category() {
    const [loading,setLoading]=useState(true)
    const {category}=useParams()
    const listings=useSelector((state)=>state.listings)
    const dis=useDispatch()
    
  const getFeedListings = () => {
    
    let  url = `http://localhost:9000/properties?category=${category}`;
    
    axios
      .get(url)
      .then((res) => {
        
        dis(setListings({ listings: res.data }));
        setLoading(false);
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getFeedListings();
  }, []);
  return (
    loading?<Loader/>:
<>
    <Navbar/>
     <h1 className="title-list">{category} Listings</h1>
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

export default Category