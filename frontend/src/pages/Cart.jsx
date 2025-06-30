import React, { useEffect, useContext, useState } from 'react'
import summaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import Context from '../context';
import { MdDelete } from "react-icons/md";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import Spinner from '../components/Spinner';
import EmptyCart from '../assets/cart/emptyCart.gif';


const Cart = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchCartProductCounts, cartProductCount } = useContext(Context);
    const totalQty = data.reduce((accumulator, currentValue) => accumulator + currentValue?.quantity, 0)
    const totalPrice = data.reduce((accumulator, currentValue) => accumulator + (currentValue?.productId?.sellingPrice) * currentValue?.quantity, 0)
    const fetchCartProducts = async () => {
        setLoading(true);
        const dataResponse = await fetch(summaryApi.cartProducts.url, {
            method: summaryApi.cartProducts.method,
            credentials: 'include',
        })
        setLoading(false);
        const cartProducts = await dataResponse.json();
        //console.log(cartProducts.data);

        if (cartProducts.success) {
            setData(cartProducts.data);
        }
    }

    const increaseCartProductQty = async (id, qty) => {
        const dataResponse = await fetch(summaryApi.updateCartProductQty.url, {
            method: summaryApi.updateCartProductQty.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                productId: id,
                qty: qty + 1
            }),
        })
        const increasedQty = await dataResponse.json();

        if (increasedQty.success) {
            fetchCartProducts();
        }
    }

    const decreaseCartProductQty = async (id, qty) => {
        if (qty >= 2) {
            const dataResponse = await fetch(summaryApi.updateCartProductQty.url, {
                method: summaryApi.updateCartProductQty.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    productId: id,
                    qty: qty - 1
                }),
            })
            const decreasedQty = await dataResponse.json();

            if (decreasedQty.success) {
                fetchCartProducts();
            }
        }
    }

    const handleDeleteProduct = async (id) => {
        const dataResponse = await fetch(summaryApi.deleteCartProduct.url, {
            method: summaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                productId: id,
            }),
        })
        const deletedProduct = await dataResponse.json();

        if (deletedProduct.success) {
            fetchCartProducts();
            fetchCartProductCounts();
            toast.success(deletedProduct.message);
        }
    }


    useEffect(() => {
        fetchCartProducts();
    }, [])

    return (
        <>
            <div>
                {loading && <Spinner />}
               {
                data.length !== 0 && !loading && (
                    <div className='p-4 flex flex-col md:flex-row justify-between gap-10 h-full w-full'>
                        <div className='min-w-[60%] flex flex-col gap-8 rounded-sm'>
                    {
                        data.map((products, index) => {
                            return (
                                <div key={index} className='h-36 md:h-40 lg:h-52 xl:h-60 w-full bg-white flex rounded-sm shadow-md'>
                                    <div className='min-w-36 sm:min-w-44 md:min-w-36 lg:min-w-48 xl:min-w-60 bg-slate-300 p-4 rounded-s-sm'>
                                        <img src={products?.productId?.productImage[0]} alt="product image" className='h-full w-full object-scale-down' />
                                    </div>
                                    <div className='w-full p-2 flex flex-col gap-2 md:gap-2 lg:gap-3 xl:gap-5 text-sm pt-1 md:pt-2 lg:pt-4'>
                                        <div className='flex flex-col gap-1 lg:gap-2'>
                                            <p className='md:text-xl lg:text-3xl font-medium line-clamp-1'>{products?.productId?.productName}</p>
                                            <p className='text-slate-600 md:text-md lg:text-xl font-medium'>{products?.productId?.category}</p>
                                        </div>

                                        <div className='flex gap-3 md:gap-4'>
                                            <div className='flex items-center gap-3 md:gap-4 font-medium'>
                                                <button className='flex justify-center items-center border-2 px-2 md:px-3 py-1 md:py-2 rounded-sm text-sm md:text-lg lg:text-2xl cursor-pointer hover:border-red-500 hover:bg-red-500 hover:text-white transition-all' onClick={() => decreaseCartProductQty(products?._id, products?.quantity)}><LuMinus /></button>
                                                <p className='text-base md:text-2xl'>{products?.quantity}</p>
                                                <button className='flex justify-center items-center border-2 px-2 md:px-3 py-1 md:py-2 rounded-sm text-sm md:text-lg lg:text-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all' onClick={() => increaseCartProductQty(products?._id, products?.quantity)}><LuPlus /></button>
                                            </div>
                                            <div className='md:text-md lg:text-xl border-2 border-black hover:border-red-500 px-2 md:py-2 md:px-4 rounded-sm hover:rounded-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer flex justify-center items-center' onClick={() => handleDeleteProduct(products?._id)}>
                                                <MdDelete className='font-medium' />
                                            </div>
                                        </div>
                                        <hr className="border border-slate-500 mt-1" />
                                        <div className='flex justify-between text-lg md:text-xl font-medium'>
                                            <p>Total:</p>
                                            <p>{displayINRCurrency((products?.productId?.sellingPrice) * products?.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='bg-white h-68 w-full shadow-md flex flex-col'>
                    <div className='h-12 w-full bg-green-400 flex justify-center items-center text-xl font-medium text-white'>
                        Summary
                    </div>
                    <div className='flex flex-col gap-2 px-1 py-5'>
                        <div className='flex justify-between text-xl font-medium'>
                            <p>products :</p>
                            <p className='px-4'>{cartProductCount}</p>
                        </div>
                        <div className='flex justify-between text-xl font-medium'>
                            <p>quantity :</p>
                            <p className='px-4'>{totalQty}</p>
                        </div>
                        <hr className="border border-slate-500 mt-5" />
                        <div className='flex justify-between text-xl font-medium'>
                            <p>Total :</p>
                            <p className='px-2'>{displayINRCurrency(totalPrice)}</p>
                        </div>
                    </div>
                    <div className='h-16 bg-blue-600 hover:bg-blue-700 transition-all w-full flex justify-center items-center text-xl font-medium text-white cursor-pointer'>
                        Checkout
                    </div>
                </div>
                    </div>
                )
               }
               {
                data.length === 0 && !loading && (
                    <div className='h-full mt-[50%] md:mt-[20%] lg:mt-[10%] w-full md:max-w-3xl flex justify-center items-center bg-white mx-auto p-4 text-md md:text-3xl rounded-md font-medium'>
                        <img src={EmptyCart} alt="empty cart image" className='h-32 w-32 md:h-64 md:w-64' />
                        <p>🛒 Looks like your cart is empty!</p>
                    </div>
                )
               } 
            </div>
        </>
    )
}

export default Cart