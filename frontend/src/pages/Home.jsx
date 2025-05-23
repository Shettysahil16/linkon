import React from 'react'
import CategoryList from '../components/CategoryList'
import Carousel from '../components/Carousel'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <Carousel/>
      <CategoryList/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Earphones"}/>

      <VerticalCardProduct category={"mobile"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera and Photography"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speaker and Sound"}/>
    </div>
  )
}

export default Home
