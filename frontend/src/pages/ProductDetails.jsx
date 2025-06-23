import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import summaryApi from '../common';
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';
import { IoCartSharp } from "react-icons/io5";
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryProductPage from '../components/CategoryProductPage';

const ProductDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState(null);
  const [zoomImageVisible, setZoomImageVisible] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleMouseEnterProductImage = (imageUrl) => {
    setActiveImage(imageUrl);
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const dataResponse = await fetch(summaryApi.productDetails.url, {
          method: summaryApi.productDetails.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            productId: params?.id,
          }),
        })

        const productData = await dataResponse.json();
        setData(productData?.data);
        setActiveImage(productData?.data?.productImage[0]);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params])


  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    })
  }


  return (
    <>
      <div className='container mx-auto p-6 h-full overflow-hidden'>
        {
          loading ?
            (
              <div className='flex flex-col md:flex md:flex-row gap-4 h-full w-full'>
                <div className='p-2 w-full flex flex-col-reverse md:flex md:flex-row gap-4'>
                  <div className='h-20 flex md:flex md:flex-col gap-4 pr-2 overflow-x-scroll scrollbar-none md:h-[55vh] md:w-24 md:pr-0 md:py-2 items-center'>
                    {
                      loadingList.map((_, index) => {
                        return (
                          <div key={index} className='bg-slate-200 h-full w-full min-w-20 max-w-20 md:min-h-20 md:max-h-20 rounded-md cursor-pointer shadow-md animate-pulse'>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='bg-slate-200  h-[55vh] md:h-[30vh] xl:h-[55vh] w-full rounded-md cursor-pointer relative flex shadow-md animate-pulse'>
                  </div>
                </div>
                <div className='p-4 h-full w-full flex flex-col gap-3'>
                  <p className='bg-slate-200 w-fit px-10 py-3 rounded-full animate-pulse shadow-md'></p>
                  <p className='bg-slate-200 py-3 rounded-full animate-pulse shadow-md'></p>
                  <p className='bg-slate-200 py-3 rounded-full animate-pulse shadow-md'></p>
                  <div className='bg-slate-200 py-3 rounded-full gap-1 w-28 animate-pulse shadow-md'>
                  </div>
                  <div className='flex gap-4 text-2xl font-medium mt-1'>
                    <p className='bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'></p>
                    <p className='bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'></p>
                  </div>
                  <div className='flex gap-4 mt-3 md:mt-5 '>
                    <div className='bg-slate-200 py-2 px-14 rounded-full animate-pulse shadow-md'></div>
                    <div className='bg-slate-200 py-3 px-14 rounded-full animate-pulse shadow-md'>
                    </div>
                  </div>
                  <div className='w-full md:max-w-4xl bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'>
                  </div>
                  <div className='w-full md:max-w-4xl bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'>
                  </div>
                  <div className='w-full md:max-w-4xl bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'>
                  </div>
                  <div className='w-full md:max-w-4xl bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'>
                  </div>
                  <div className='w-full md:max-w-4xl bg-slate-200 py-3 px-10 rounded-full animate-pulse shadow-md'>
                  </div>

                </div>
              </div>
            )
            :
            (
              <div className='flex flex-col md:flex md:flex-row gap-4 h-full w-full'>
                <div className='p-2 w-full flex flex-col-reverse md:flex md:flex-row gap-4'>
                  <div className='h-20 flex md:flex md:flex-col gap-4 pr-2 overflow-x-scroll scrollbar-none md:h-[55vh] md:w-24 md:pr-0 md:py-2 items-center'>
                    {
                      data.productImage.map((imageUrl, index) => {
                        return (
                          <div key={index} className='bg-slate-200 h-full w-full min-w-20 max-w-20 md:min-h-20 md:max-h-20 rounded-md cursor-pointer'>
                            <img src={imageUrl} alt={data?.productName} className='rounded-md h-full w-full object-scale-down' onMouseEnter={() => handleMouseEnterProductImage(imageUrl)} />
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='bg-slate-200  h-[55vh] md:h-[30vh] xl:h-[55vh] w-full rounded-md cursor-pointer relative flex'>
                    <img src={activeImage} alt={data?.productName} className='h-full w-full object-scale-down rounded-md'
                      onMouseMove={(e) => handleZoomImage(e)}
                      onMouseEnter={() => setZoomImageVisible(true)}
                      onMouseLeave={() => setZoomImageVisible(false)}
                    />
                    {
                      zoomImageVisible && (
                        <div className='hidden md:block absolute bg-slate-200 -right-[640px] md:h-[30vh] md:w-[700px] lg:h-[80vh] lg:w-[630px] top-0 overflow-hidden shadow-md'>
                          <div
                            className='h-full w-full'
                            style={{
                              backgroundImage: `url(${activeImage})`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                              backgroundSize: '250%',
                            }}
                          >
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className='p-4 h-full w-full flex flex-col gap-3'>
                  <p className='font-medium text-xl text-white bg-green-300 w-fit px-6 py-1 rounded-full text-center'>{data?.brandName}</p>
                  <p className='font-medium text-4xl'>{data?.productName}</p>
                  <p className='font-medium capitalize text-slate-400'>{data?.category}</p>
                  <div className='flex text-xl text-orange-400 gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                  <div className='flex gap-4 text-2xl font-medium mt-1'>
                    <p>{displayINRCurrency(data?.sellingPrice)}</p>
                    <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                  </div>
                  <div className='flex gap-4 mt-3 md:mt-5 text-sm md:text-xl'>
                    <button className='py-3 px-8 rounded-md text-green-400 cursor-pointer border-2 font-medium hover:bg-green-400 hover:text-white transition-all'>Buy</button>
                    <button className=' flex justify-center items-center gap-2 py-3 px-8 rounded-md text-green-400 cursor-pointer border-2 font-medium hover:bg-green-400 hover:text-white transition-all'>
                      Add to Cart
                      <IoCartSharp className='text-xl md:text-2xl xl:text-3xl' />
                    </button>
                  </div>
                  <div className='w-full md:max-w-4xl'>
                    description:- {data?.description}
                  </div>
                </div>
              </div>
            )
        }
      </div>
        {
          data?.category && (
            <CategoryProductPage category={data?.category} heading={"Recommended products"} />
          )
        }
    </>
  )
}

export default ProductDetails
//md:w-[42vw] lg:w-[25vw] h-[80%] md:h-[60%] lg:h-[80%] w-full 