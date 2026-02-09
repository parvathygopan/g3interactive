import React from 'react'
import { BiHome } from 'react-icons/bi'
import "./BannerStyle.css"
import Service from './Service'
import BannerHouse from "../../Assets/house.png"
function Banner() {
  return (
   <section className="banner-section">
      <div className="container text-center">
        <div className="banner-content">
          <h1 className="banner-title">
            Home Experts at 
          </h1>
          <h1 className='banner-title2'>Your <img
                    src={BannerHouse}
                      alt="banner"
                      className="house-icon"
                      draggable="false"
                    /> Door</h1>
          <p className="banner-subtitle">
            Expert home services, delivered to your doorstep - get reliable handyman solution
            with ease. Fast, professional, and tailored to your needs.
          </p>
        </div>
      </div>
      <Service />
    </section>
  )
}

export default Banner
