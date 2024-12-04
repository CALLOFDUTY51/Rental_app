import React from 'react'
import Navbar from '../compnents/Navbar'
import Slide from '../compnents/Slide'
import Categories from '../compnents/Categories'
import Listings from '../compnents/Listings'
import Footer from '../compnents/footer'


const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Slide/>
    <Categories/>
    <Listings/>
    <Footer/>
    </>
  )
}

export default HomePage