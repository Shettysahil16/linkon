import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import Spinner from '../components/Spinner';

function AllProducts() {
  const [loading, setLoading] = useState(false);
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchProductDetails = async () => {
    setLoading(true);
    const dataResponse = await fetch(summaryApi.allProducts.url, {
      method: summaryApi.allProducts.method,
      credentials: 'include',
    })
    setLoading(false);
    const productsDetails = await dataResponse.json();

    if (productsDetails.success) {
      setAllProduct(productsDetails.data || []);
      //console.log(productsDetails.data);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [])
  return (
    <div>
      {loading && <Spinner/>}
      <div className='bg-white p-4 flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <button
          className='text-lg border-2 border-green-500 hover:bg-green-500 text-green-600 hover:text-white hover:border-slate-500 font-medium cursor-pointer transition-all px-4 py-3 rounded-full'
          onClick={() => setShowUploadProduct(!showUploadProduct)}
        >
          Upload Product
        </button>
      </div>
      <div className='flex flex-wrap items-center gap-5 py-4 h-[calc(100vh-280px)] overflow-y-scroll'>
        {
          allProduct.map((products, index) => {
            return (
              <AdminProductCard key={index} data={products} fetchProductDetails={fetchProductDetails}/>
            )
          })
        }
      </div>
      {
        showUploadProduct && (
          <UploadProducts onClose={() => setShowUploadProduct(!showUploadProduct)} fetchProductDetails={fetchProductDetails}/>
        )
      }
    </div>
  )
}

export default AllProducts
