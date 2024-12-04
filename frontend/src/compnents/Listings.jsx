import React, { useEffect, useState } from "react";
import { categories } from "../data";
import "../Styles/Listings.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setListings } from "../redux/state";
import Loader from "./Loader";
import ListingCards from "./ListingCards";
function Listings() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);
  

  const getFeedListings = () => {
    let url;        const apiUrl = import.meta.env.VITE_API_URL;
    if (selectedCategory === "All") {
      url = `${apiUrl}/properties`;
    } else {
      url =  `${apiUrl}/properties?category=${selectedCategory}`;
    }
    axios
      .get(url)
      .then((res) => {
        
        dispatch(setListings({ listings: res.data }));
        setLoading(false);
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => {
          return (
            <div
              className={`category ${
                category.label === selectedCategory ? "selected" : ""
              }`}
              key={index}
              onClick={() => {
                setSelectedCategory(category.label);
              }}
            >
              <div className="category_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          );
        })}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
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
              booking=false
            },index) => (
              <ListingCards key={index}
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
      )}
    </>
  );
}

export default Listings;
