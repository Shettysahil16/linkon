import React, { useContext, useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import PropTypes from 'prop-types';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const loadingList = new Array(9).fill(null);
    const [loading, setLoading] = useState(true);
    const scrollElement = useRef();
    const { fetchCartProductCounts } = useContext(Context);

    const fetchData = async () => {
        setLoading(true);
        const products = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(products?.data);
    }

    const handleAddToCartProduct = async(e,id) => {
        await addToCart(e,id);
        fetchCartProductCounts()
    }

    useEffect(() => {
        fetchData();
    }, [])
    const prevScroll = () => {
        scrollElement.current.scrollLeft -= 300;
    }

    const nextScroll = () => {
        scrollElement.current.scrollLeft += 300;
    }
    return (
        <div className='my-4 mr-4 p-4 flex flex-col gap-4 relative'>
            <h1 className='font-semibold text-4xl'>{heading}</h1>
            {
                loading ?
                    (
                        <div className='flex gap-15  items-center'>
                            {
                                loadingList.map((_, index) => {
                                    return (
                                        <div key={index} className='h-36 md:h-48 w-full min-w-[250px] max-w-[250px] md:min-w-[450px] md:max-w-[450px] bg-white shadow-md flex rounded-md relative cursor-pointer'>
                                            <div className='bg-slate-300 h-full p-2 min-w-[120px]  md:min-w-[180px] animate-pulse'>

                                            </div>
                                            <div className='px-2 py-4 md:p-4 flex flex-col gap-3 md:gap-4 w-full'>
                                                <p className='bg-slate-200 py-2 md:py-3 rounded-full animate-pulse'></p>
                                                <p className='bg-slate-200 py-2 md:py-3 rounded-full w-fit px-8 md:px-12 animate-pulse'></p>
                                                <div className='flex gap-2 md:gap-4'>
                                                    <p className='bg-slate-200 py-2 md:py-3 rounded-full w-fit px-6 md:px-12 animate-pulse'></p>
                                                    <p className='bg-slate-200 py-2 md:py-3 rounded-full w-fit px-6 md:px-12 animate-pulse'></p>
                                                </div>
                                                <div className='absolute  right-1 md:right-2 bottom-4'>
                                                    <button className='bg-slate-200 py-3 md:py-5 px-10 md:px-16 rounded-full animate-pulse'>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    )
                    : (
                        <div className='flex gap-15 overflow-x-scroll scrollbar-none items-center transition-all' ref={scrollElement}>
                            <button className='hidden xl:block h-fit w-fit rounded-full absolute left-0 z-10 py-3 px-3 bg-blue-500 text-white shadow-md text-lg' onClick={prevScroll}><FaAngleLeft /></button>
                            <button className='hidden xl:block h-fit w-fit rounded-full absolute right-0  z-10 py-3 px-3 bg-blue-500 text-white shadow-md text-lg' onClick={nextScroll}><FaAngleRight /></button>
                            {
                                data.map((product, index) => {
                                    return (
                                        <Link to={"/product-details/"+product?._id} key={index} className='h-36 md:h-48 w-full min-w-[250px] max-w-[250px] md:min-w-[450px] md:max-w-[450px] bg-white shadow-md flex rounded-md relative cursor-pointer'>
                                            <div className='bg-slate-300 h-full p-2 min-w-[120px]  md:min-w-[180px]'>
                                                <img src={product.productImage[0]} alt="product image" className='h-full w-full p-2 hover:scale-110 transition-all' />
                                            </div>
                                            <div className='px-2 py-4 md:p-4 flex flex-col gap-2'>
                                                <p className='font-medium text-xs md:text-lg text-ellipsis line-clamp-1 '>{product?.productName}</p>
                                                <p className='capitalize text-xs md:text-lg'>{product?.category}</p>
                                                <div className='flex gap-2 md:gap-4 text-xs md:text-xl'>
                                                    <p className='font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                                </div>
                                                <div className='absolute  right-1 md:right-2 bottom-4 text-xs md:text-xl text-white'>
                                                    <button className='bg-green-400 py-2 px-4 rounded-full hover:scale-105 transition-all'
                                                     onClick={(e) => {
                                                        handleAddToCartProduct(e,product?._id)
                                                        }}>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    )

                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}

HorizontalCardProduct.propTypes = {
    category: PropTypes.string,
    heading : PropTypes.string,
}

export default HorizontalCardProduct
