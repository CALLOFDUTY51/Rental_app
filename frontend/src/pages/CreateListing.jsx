import React, { useState } from "react";
import "../Styles/CreateListing.scss";
import Navbar from "../compnents/Navbar";
import { categories, facilities, types } from "../data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import variables from "../Styles/myvariables";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../compnents/footer";
function CreateListing() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;

    setFormLocation({ ...formLocation, [name]: value });
  };

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities(amenities.filter((item) => item !== facility));
    } else {
      setAmenities([...amenities, facility]);
    }
    console.log(amenities);
  };

  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;

    setPhotos((oldPhotos) => [...oldPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((item, index) => index !== indexToRemove)
    );
  };

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({ ...formDescription, [name]: value });
  };

  const creatorId = useSelector((state) => state.user._id);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handlePost = async (e) => {
    e.preventDefault();

    //   SLOWER WAY TO UPLOAD PHOTOS

  

  //   const formData = new FormData();
  //   try{
  //   for (let i = 0; i < photos.length; i++) {
  //     formData.append("file", photos[i]);
  //     formData.append("upload_preset", "Rental_preset");

  //     let cloudinaryResponse = await axios.post(
  //       "https://api.cloudinary.com/v1_1/db7yqdhcl/image/upload",
  //       formData
  //     );
  //     console.log(cloudinaryResponse.data.url);

  //     photoPaths.push(cloudinaryResponse.data.url);
  //   }
  
    try {
      // Concurrently upload photos
      const photoUploadPromises = photos.map((photo) => {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", "Rental_preset");
        return axios.post(`https://api.cloudinary.com/v1_1/db7yqdhcl/image/upload`, formData);
      });
  
      const cloudinaryResponses = await Promise.all(photoUploadPromises);
      console.log(photoUploadPromises)
      console.log(cloudinaryResponses)
  
      // Extract photo URLs
      const photoPaths = cloudinaryResponses.map((response) => response.data.url);
      console.log(photoPaths);
  
      // Prepare listing data
      const listingFormData = {
        creator: creatorId,
        category: category,
        type: type,
        streetAddress: formLocation.streetAddress,
        aptSuite: formLocation.aptSuite,
        city: formLocation.city,
        province: formLocation.province,
        country: formLocation.country,
        guestCount: guestCount,
        bedroomCount: bedroomCount,
        bedCount: bedCount,
        bathroomCount: bathroomCount,
        title: formDescription.title,
        description: formDescription.description,
        highlight: formDescription.highlight,
        highlightDesc: formDescription.highlightDesc,
        price: formDescription.price,
        amenities: amenities,
        listingPhotoPaths: photoPaths, // Array of photo URLs
      };
  
      // Submit listing data
      
      const apiUrl = import.meta.env.VITE_API_URL;  // Access the environment variable
const url = `https://rental-app-vc3y.onrender.com/properties/create`;     // Combine with the endpoint

      const response = await axios.post(url, listingFormData);
      console.log(response.data);
  
      // Navigate to home or confirmation page
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form action="" onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1:Tell us about your place</h2>
            <br />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category == item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setCategory(item.label);
                  }}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type == item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    setType(item.name);
                  }}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>
            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  onChange={handleChangeLocation}
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apartment, Suite, etc. (if applicable"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      ":hover": { color: variables.pinkred },
                    }}
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-listing_step2">
            <h2>Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((items, index) => (
                <div
                  className={`facility ${
                    amenities.includes(items.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    handleSelectAmenities(items.name);
                  }}
                >
                  <div className="facility_icon">{items.icon}</div>
                  <p>{items.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <div className="photos">
              {photos.length < 1 && (
                <>
                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="alone">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}
              {photos.length >= 1 && (
                <>
                  {photos.map((photo, index) => {
                    return (
                      <>
                        <div className="photo">
                          <img src={URL.createObjectURL(photo)} alt="" />
                          <button
                            type="button"
                            onClick={() => {
                              handleRemovePhoto(index);
                            }}
                          >
                            <BiTrash />
                          </button>
                        </div>
                      </>
                    );
                  })}
                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="alone">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}
            </div>
            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                required
                onChange={handleChangeDescription}
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                required
                onChange={handleChangeDescription}
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                required
                onChange={handleChangeDescription}
              />
              <p>Highlight Details</p>
              <textarea
                type="text"
                placeholder="Highlight Details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                required
                onChange={handleChangeDescription}
              />
              <p>Now set your Price</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                className="price"
                value={formDescription.price}
                required
                onChange={handleChangeDescription}
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            Create Your Listing
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateListing;
