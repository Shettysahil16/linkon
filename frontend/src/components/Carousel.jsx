import React, { useState } from 'react'
import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import image1Mobile from '../assets/banner/img1_mobile.jpg'
import image2Mobile from '../assets/banner/img2_mobile.webp'
import image3Mobile from '../assets/banner/img3_mobile.jpg'
import image4Mobile from '../assets/banner/img4_mobile.jpg'
import image5Mobile from '../assets/banner/img5_mobile.png'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function Carousel() {
    const [currentImage, setCurrentImage] = useState(4);
    
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]
    const prevImage = () => {
            setCurrentImage(currentImage - 1)
    }

    const nextImage = () => {
        if(currentImage === 4){
            setCurrentImage(0);
        }
        else{
            setCurrentImage(currentImage + 1)
        }
    }
    return (
        <div>
            <div className='h-[30vh] md:h-[50vh] w-full bg-slate-200 relative flex items-center overflow-hidden'>
                <div className='absolute z-10 w-full lg:flex justify-between text-8xl text-white hidden'>
                    <button className={`hover:border-2 py-4 hover:py-4 hover: border-slate-300 ${currentImage === 0 ? "opacity-50" : "opacity-100"}`} disabled={currentImage === 0} onClick={prevImage}><FaAngleLeft /></button>
                    <button className='hover:border-2 py-4 hover:py-4 hover: border-slate-300' onClick={nextImage}><FaAngleRight /></button>
                </div>
                <div className='flex h-full w-full md:hidden'>
                    {
                        mobileImages.map((imageURI, index) => {
                            return (
                                <div className='h-full w-full min-h-full min-w-full transition-all' key={index} style={{ transform: `translate(-${currentImage * 100}%)` }}>
                                    <img src={imageURI} alt="image1" className='h-full w-full object-cover' />
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className='hidden md:flex h-full w-full'>
                    {
                        desktopImages.map((imageURI, index) => {
                            return (
                                <div className='h-full w-full min-h-full min-w-full transition-all' key={index} style={{ transform: `translate(-${currentImage * 100}%)` }}>
                                    <img src={imageURI} alt="image1" className='h-full w-full sm:lg:object-cover md:lg:object-cover lg:object-cover xl:object-fill' />
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Carousel
