import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalSearchCard = ({ loading, data }) => {
    const loadingList = new Array(9).fill(null);
    const { fetchCartProductCounts } = useContext(Context);

    const handleAddToCartProduct = async (e, id) => {
        await addToCart(e, id);
        fetchCartProductCounts()
    }

    return (
        <div className='flex justify-center items-center p-4'>
            {
                loading ?
                    (
                        <div className='flex gap-15 items-center'>
                            {
                                loadingList.map((_, index) => {
                                    return (
                                        <div key={index} className='h-56 md:h-[30rem] w-full min-w-[150px] max-w-[200px] md:min-w-[300px] md:max-w-[450px] bg-white shadow-md flex flex-col rounded-md relative cursor-pointer'>
                                            <div className='bg-slate-300 h-24 p-2 min-w-[120px]  md:min-w-[180px] md:h-68 flex justify-center animate-pulse'>
                                            </div>
                                            <div className='px-2 py-1 md:p-4 flex flex-col gap-2 md:gap-3 w-full mt-2'>
                                                <p className='bg-slate-200 py-2 md:py-3 rounded-full animate-pulse'></p>
                                                <p className='bg-slate-200 w-fit py-2 md:py-3 px-8 md:px-14 rounded-full animate-pulse'></p>
                                                <div className='flex gap-2 md:gap-4 '>
                                                    <p className='bg-slate-200 py-2 md:py-3 px-8 md:px-15 rounded-full animate-pulse'></p>
                                                    <p className='bg-slate-200 py-2 md:py-3 px-8 md:px-15 rounded-full animate-pulse'></p>
                                                </div>
                                                <div className='w-fit mx-auto text-xs md:text-xl text-white mt-2'>
                                                    <button className='bg-slate-200 py-3 px-15 md:py-4 md:px-28 rounded-full hover:scale-105 transition-all animate-pulse'>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    )
                    :
                    (
                        <div className='flex px-4'>
                                <div className='min-w-0 mx-auto flex justify-center lg:justify-start flex-wrap gap-5 md:gap-10 overflow-x-scroll scrollbar-none transition-all p-4'>
                                    {
                                        data.map((product, index) => {
                                            return (
                                                <Link to={"/product-details/" + product?._id} key={index} className='h-56 md:h-[30rem]  w-full min-w-[150px] max-w-[200px] md:min-w-[300px] md:max-w-[400px] lg:min-w-[300px] lg:max-w-[420px] bg-white shadow-md flex flex-col rounded-md relative cursor-pointer'>
                                                    <div className='bg-slate-300 h-24 p-2 min-w-[120px]  md:min-w-[180px] md:h-68 flex justify-center'>
                                                        <img src={product.productImage[0]} alt="product image" className='h-full p-2 hover:scale-110 transition-all object-contain max-w-full' />
                                                    </div>
                                                    <div className='px-2 py-1 md:p-4 flex flex-col gap-2 md:gap-2'>
                                                        <p className='font-medium text-xs md:text-lg overflow-hidden text-ellipsis whitespace-nowrap leading-tight m-0 p-0'>{product?.productName}</p>
                                                        <p className='capitalize text-xs md:text-lg w-fit'>{product?.category}</p>
                                                        <div className='flex gap-2 md:gap-4 text-xs md:text-xl'>
                                                            <p className='font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                                        </div>
                                                        <div className='w-fit mx-auto text-xs md:text-xl text-white mt-2'>
                                                            <button className='bg-green-400 py-2 px-8 md:py-3 md:px-18 rounded-full hover:scale-105 transition-all' onClick={(e) => handleAddToCartProduct(e, product?._id)}>
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )

                                        })
                                    }
                                </div>                          
                        </div>
                    )
            }
        </div>
    )
}
VerticalSearchCard.propTypes = {
    loading: PropTypes.boolean,
    data: PropTypes.array,
}

export default VerticalSearchCard

