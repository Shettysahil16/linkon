import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const loadingList = new Array(9).fill(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const products = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(products?.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='my-4 mr-4 p-4 flex flex-col gap-4 overflow-x-scroll'>
            <h1 className='font-semibold text-4xl'>{heading}</h1>
            <div className='flex gap-15'>
                {
                    data.map((product, index) => {
                        return (
                            <div key={index} className='h-36 md:h-48 w-full min-w-[250px] max-w-[250px] md:min-w-[450px] md:max-w-[450px] bg-white shadow-md flex rounded-md relative'>
                                <div className='bg-slate-300 h-full p-2 min-w-[120px]  md:min-w-[180px]'>
                                    <img src={product.productImage[0]} alt="product image" className='h-full w-full p-2' />
                                </div>
                                <div className='px-2 py-4 md:p-4 flex flex-col gap-2'>
                                    <p className='font-medium text-xs md:text-lg text-ellipsis line-clamp-1 '>{product?.productName}</p>
                                    <p className='capitalize text-xs md:text-lg'>{product?.category}</p>
                                    <div className='flex gap-2 md:gap-4 text-xs md:text-xl'>
                                        <p className='font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <div className='absolute  right-1 md:right-2 bottom-4 text-xs md:text-xl text-white'>
                                        <button className='bg-green-400 py-2 px-4 rounded-full hover:scale-105 transition-all'>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default HorizontalCardProduct
