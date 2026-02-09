import React from 'react'
import Header from '../Components/Home/Header'
import Banner from '../Components/Banner/Banner'
import Slider from '../Components/Slider/Slider'
import Products from '../Components/Products/Products'

function Home() {
  return (
    <div className='container-fluid'>
     
      <Header />
      <Banner />
      <Slider />
      <Products />
    </div>
  )
}

export default Home
