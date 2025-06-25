import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryApi from '../common';
import VerticalSearchCard from '../components/VerticalSearchCard';
import loadingGif from '../assets/loading.gif';

function SearchProduct() {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchProducts = async () => {
    setLoading(true);
    const dataResponse = await fetch(summaryApi.searchProducts.url + query.search, {
      method: summaryApi.searchProducts.method,
      credentials: 'include'
    })
    setLoading(false);
    const searchedProducts = await dataResponse.json();

    if (searchedProducts.success) {
      setData(searchedProducts.data);
    }

  }

  useEffect(() => {
    fetchSearchProducts();
  }, [query.search])
  return (
    <div className='container mx-auto text-xl'>
      {
        loading && (
          <div className='h-full w-full flex justify-center items-center opacity-50'>
            <img src={loadingGif} alt="loading" />
          </div>
        )
      }
      {
        data.length === 0 && !loading && (
          <p className='text-3xl font-medium pt-4 px-12 text-center'>No products found</p>
        )
      }
      {
        data.length !== 0 && !loading && (
          <div>
            <p className='text-3xl font-medium pt-4 px-12'>Search Results: {data?.length}</p>
            <VerticalSearchCard loading={loading} data={data} />
          </div>

        )
      }
    </div>
  )
}

export default SearchProduct
