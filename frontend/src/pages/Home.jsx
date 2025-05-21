import React from 'react'
import CategoryList from '../components/CategoryList'
import Carousel from '../components/Carousel'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <Carousel/>
      <CategoryList/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    </div>
  )
}

export default Home
