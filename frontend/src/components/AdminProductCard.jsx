import React from 'react';
import PropTypes from 'prop-types';
import AdminEditProduct from './AdminEditProduct';
import { useState } from 'react';
import displayINRCurrency from '../helpers/displayCurrency';

function AdminProductCard({
    data,
    fetchProductDetails,
}) {
    const [openAdminEditProduct, setOpenAdminEditProduct] = useState(false);
    const [loading, setLoading] = useState(true);
    return (
        <div>
            <div>
                <div className='bg-green-400 p-4 my-2 h-[300px] w-[240px] rounded-md flex flex-col gap-2'>
                    <div className='flex justify-center items-center p-1'>
                        <img src={data?.productImage[0]} alt={data?.productName} height={150} width={150} className="w-full h-[150px] object-contain rounded" />
                    </div>
                    <div>
                        <p className='text-lg truncate'>{data?.productName}</p>
                        <p className='text-xl font-semibold'>{displayINRCurrency(data?.sellingPrice)}</p>
                    </div>
                    <div>
                        <button
                            className='w-fit block ml-auto border-2 py-2 px-8 rounded-full text-white border-white cursor-pointer'
                            onClick={() => setOpenAdminEditProduct(!openAdminEditProduct)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
                {
                    openAdminEditProduct && (
                        <AdminEditProduct data={data} onClose={() => setOpenAdminEditProduct(!openAdminEditProduct)} fetchProductData={fetchProductDetails} />
                    )
                }
            </div>
        </div>
    )
}

AdminProductCard.propTypes = {
    data: PropTypes.object,
    fetchProductDetails: PropTypes.func,
}

export default AdminProductCard
