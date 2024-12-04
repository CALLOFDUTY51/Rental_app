import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegistrationPage from "./pages/RegistrationPage"
import LoginPage from "./pages/LoginPage"
import CreateListing from "./pages/CreateListing"
import ListingDetails from "./pages/ListingDetails"
import TripList from "./pages/TripList"
import WishList from "./pages/WishList"
import PropertyList from "./pages/PropertyList"
import ReservationList from "./pages/ReservationList"
import Category from "./pages/Category"
import SearchPage from "./pages/SearchPage"

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/properties/:listingId" element={<ListingDetails/>}/>
        <Route path="/properties/category/:category" element={<Category/>}/>
        <Route path="/:userId/trips" element={<TripList/>}/>
        <Route path="/:userId/wishList" element={<WishList/>}/>
        <Route path="/:userId/propertyList" element={<PropertyList/>}/>
        <Route path="/:userId/reservationList" element={<ReservationList/>}/>
        <Route path="/search/:search" element={<SearchPage/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
