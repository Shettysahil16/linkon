import React, { useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
import PropTypes from 'prop-types';
import productCategory from '../helpers/productCategory';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdFullscreen } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

function UploadProducts({
    onClose,
    fetchProductDetails,
}) {
    const [loading, setLoading] = useState(false);
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImageUrl, setFullScreenImageUrl] = useState(null);
    const [productData, setProductData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if(!file){
            return;
        }
        const uploadImageCloudinary = await uploadImage(file);
        setProductData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteImage = (imageId) => {
        setProductData((prev) => {
            return {
                ...prev,
                productImage: prev.productImage.filter((_, index) => index != imageId)
            }
        })

    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataResponse = await fetch(summaryApi.uploadProduct.url, {
            method: summaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        setLoading(false);
        const productDetails = await dataResponse.json();
        

        if(productDetails.success) {
            toast.success(productDetails?.message);
            onClose();
            fetchProductDetails();
        }

        if(productDetails.error) {
            toast.error(productDetails?.message);
        }
    }
    return (
        <div>
            {loading && <Spinner />}
            <div className='h-full w-full fixed top-0 left-0 flex justify-center items-center z-10'>
                <div className='bg-white w-full max-w-2xl mx-auto shadow-md p-4 h-full max-h-[80%] overflow-hidden'>
                    <div className='flex justify-between items-center text-2xl pb-4'>
                        <h1 className='text-3xl font-semibold '>Upload Product</h1>
                        <button>
                            <ImCancelCircle className='hover:text-red-500 cursor-pointer text-3xl' onClick={onClose} />
                        </button>
                    </div>
                    <form className='flex flex-col py-2 gap-6 overflow-y-auto max-h-[60vh] pr-4 pb-5' onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor='productName' className='text-xl'>Product Name : </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <input
                                    type="text"
                                    id='productName'
                                    name="productName"
                                    onChange={handleOnChange}
                                    value={productData.productName}
                                    required
                                    placeholder="Enter product name"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='brandName' className='text-xl'>Brand Name : </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <input
                                    type="text"
                                    id='brandName'
                                    name="brandName"
                                    onChange={handleOnChange}
                                    value={productData.brandName}
                                    required
                                    placeholder="Enter brand name"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='category' className='text-xl'>Category : </label>
                            <select
                                name="category"
                                id="category"
                                onChange={handleOnChange}
                                value={productData.category}
                                required
                                className='p-2 border border-slate-300 bg-slate-200 rounded cursor-pointer'>
                                <option>Select Product Category</option>
                                {
                                    productCategory.map((products) => {
                                        return (
                                            <option value={products.value} key={products.id}>{products.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor='productImage' className='text-xl'>Product Image : </label>
                            <label htmlFor='uploadImageInput'>
                                <div className="bg-slate-200 p-2 rounded mt-2 h-34 flex flex-col justify-center items-center cursor-pointer">
                                    <IoMdCloudUpload className='text-5xl' />
                                    <p>Upload image</p>
                                    <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadImage} />
                                </div>
                            </label>
                        </div>
                        <div>
                            {
                                productData.productImage[0] ? (
                                    <div className='flex gap-3 flex-wrap'>
                                        {
                                            productData.productImage.map((productImage, index) => {
                                                return (
                                                    <div key={index} className='relative group rounded border border-slate-300 cursor-pointer'>
                                                        <img
                                                            src={productImage}
                                                            height={90}
                                                            width={100}
                                                            className='bg-slate-200 border border-slate-300 cursor-pointer'
                                                        />
                                                        <div className='absolute inset-0 bg-slate-600 opacity-0 group-hover:opacity-50 transition ease-in duration-100'></div>
                                                        <div className='absolute inset-0 flex justify-center items-center text-4xl text-white opacity-0 group-hover:opacity-100'>
                                                            <MdFullscreen className='hover:scale-115 transition ease-in' onClick={() => {
                                                                setOpenFullScreenImage(!openFullScreenImage),
                                                                    setFullScreenImageUrl(productImage)
                                                            }} />
                                                            <MdDelete className='hover:text-red-400 transition' onClick={() => handleDeleteImage(index)} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                                    :
                                    (
                                        <p className='text-red-500 text-xl'>*please upload product image</p>
                                    )
                            }
                        </div>
                        <div className='flex flex-col gap-1 mt-2'>
                            <label htmlFor='description' className='text-xl'>Description : </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder='enter product description'
                                    className='outline-none h-30 w-full bg-transparent p-1 resize-none'
                                    value={productData.description}
                                    required
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='price' className='text-xl'>Price : </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <input
                                    type="number"
                                    id='price'
                                    name="price"
                                    onChange={handleOnChange}
                                    value={productData.price}
                                    required
                                    placeholder="Enter price"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='sellingPrice' className='text-xl'>Selling Price : </label>
                            <div className="bg-slate-200 p-2 rounded mt-2">
                                <input
                                    type="number"
                                    id='sellingPrice'
                                    name="sellingPrice"
                                    onChange={handleOnChange}
                                    value={productData.sellingPrice}
                                    required
                                    placeholder="Enter selling price"
                                    className="outline-none h-full w-full bg-transparent p-1"
                                />
                            </div>
                        </div>
                        <button className='bg-green-500 text-white p-3 text-xl hover:bg-green-600 cursor-pointer'>Upload Product</button>
                    </form>
                </div>
            </div>
            {
                openFullScreenImage && (
                    <DisplayImage imageUrl={fullScreenImageUrl} onClose={() => setOpenFullScreenImage(!openFullScreenImage)} />
                )
            }
        </div>
    )
}

UploadProducts.propTypes = {
    onClose: PropTypes.func,
    fetchProductDetails : PropTypes.func,
}

export default UploadProducts
