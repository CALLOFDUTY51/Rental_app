import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon, IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../Styles/myvariables";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/Navbar.scss";
import { setLogout } from "../redux/state";
function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate=useNavigate()

  const dis = useDispatch();
  const [search, setSearch] = useState("");

  const handleClick=()=>{
    if(search!==""){
    navigate(`/search/${search}`)
    }
  }

  return (
    <div className="navbar">
      <Link className="a host" to="/">
        <img src="/assets/logo.png" alt="" />
      </Link>
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search...."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <IconButton onClick={handleClick}>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <Link className="a host" to="/create-listing">
            Become a Host
          </Link>
        ) : (
          <Link className="a host" to="/login">
            Become a host
          </Link>
        )}
        <button
          onClick={() => {
            setDropDown(!dropDown);
          }}
          className="navbar_right_account"
        >
          <Menu sx={{ color: variables.darkgrey }}></Menu>
          {!user ? (
            <Person sx={{ color: variables.darkgrey }}></Person>
          ) : (
            <img
              src={user.profileImagePath}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            ></img>
          )}
        </button>
        {dropDown && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}
        {dropDown && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/propertyList`}>Property List</Link>
            <Link to={`/${user._id}/reservationList`}>Reservation List</Link>
            <Link to="/create-listing">Become a Host</Link>
            <Link
              to="/login"
              onClick={() => {
                dis(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
