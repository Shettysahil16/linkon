import React, { useEffect, useState } from 'react'
import summaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const[productCategory, setProductCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchCategoryProduct = async() => {
        setLoading(true);
        const dataResponse = await fetch(summaryApi.productCategory.url,{
            method : summaryApi.productCategory.method,
        })
        const categoryProducts = await dataResponse.json();
        setLoading(false);
        setProductCategory(categoryProducts.data);
    }

    useEffect(() => {
        fetchCategoryProduct();
    },[]);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center gap-4 overflow-scroll py-2 scrollbar-none'>
      {
        loading ? 
        (
          productCategory.map((index) => {
            return(
                <div key={index} className='flex flex-col gap-1 cursor-pointer'>
                <div className='rounded-full bg-slate-200 h-24 w-24 md:h-32 md:w-32 p-7 overflow-hidden flex justify-center items-center animate-pulse'>
                </div>
                </div>
            )
        })
        )
        :
        (
          productCategory.map((products, index) => {
            return(
                <Link to={"/product-category/"+ products?.category} key={index} className='flex flex-col gap-1 cursor-pointer'>
                <div className='rounded-full bg-slate-200 h-24 w-24 md:h-32 md:w-32 p-7 overflow-hidden flex justify-center items-center'>
                    <img src={products.productImage[0]} alt="product" className='h-full object-scale-down hover:scale-115 transition-all mix-blend-multiply' />
                </div>
                <p className='text-center capitalize font-semibold text-xs md:text-base'>{products?.category}</p>
                </Link>
            )
        })
        )
      }
      </div>
    </div>
  )
}

export default CategoryList
