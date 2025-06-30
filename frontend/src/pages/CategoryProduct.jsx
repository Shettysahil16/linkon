import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory';
import summaryApi from '../common';
import VerticalSearchCard from '../components/VerticalSearchCard';
import Spinner from '../components/Spinner';

function CategoryProduct() {
    const params = useParams();
    //console.log(params.categoryName);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const urlCategoryListObject = {};
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");


    urlCategoryListInArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;

        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    const fetchData = async () => {
        setLoading(true);
        const dataResponse = await fetch(summaryApi.filterProducts.url, {
            method: summaryApi.filterProducts.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                category: filterCategoryList,
            })
        })
        setLoading(false);
        const filteredProducts = await dataResponse.json();

        if (filteredProducts?.success) {
            setData(filteredProducts?.data || []);
            //console.log("filteredProducts",filteredProducts);

        }
    }

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;

        setSortBy(value);

        if (value === "asc") {
            setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
        }

        if (value === "dsc") {
            setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    }

    useEffect(() => {
        fetchData();
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el);
        //console.log("arrayOfCategory", arrayOfCategory);
        setFilterCategoryList(arrayOfCategory);
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })
        //console.log(urlFormat);
        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])

    return (
        <div>
            {
                loading && <Spinner />
            }
            <div className='flex'>
                <div className='hidden md:flex flex-col gap-4 min-h-[calc(100vh-220px)] p-4 bg-white w-full max-w-[20%]'>
                    <div>
                        <h3 className='border-b-2 text-slate-500 font-medium text-2xl'>SORT BY :-</h3>
                        <form className='py-2 text-lg flex flex-col gap-2'>
                            <div className='flex gap-1'>
                                <input type="radio" name='sortBy' checked={sortBy === 'asc'} value={'asc'} className='cursor-pointer' onChange={(e) => handleOnChangeSortBy(e)} />
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" name='sortBy' checked={sortBy === 'dsc'} value={'dsc'} className='cursor-pointer' onChange={(e) => handleOnChangeSortBy(e)} />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h3 className='border-b-2 text-slate-500 font-medium text-2xl'>FILTER :-</h3>
                        <form className='py-2 text-lg flex flex-col gap-2'>
                            {
                                productCategory.map((category, index) => {
                                    return (
                                        <div key={index} className='flex gap-1'>
                                            <input type="checkbox" name={"category"} value={category?.value} id={category?.value} checked={selectCategory[category?.value]} className='cursor-pointer' onChange={(e) => handleSelectCategory(e)} />
                                            <label htmlFor={category?.value}>{category?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>
                <div className='h-full w-full'>
                    <div className='min-h-[calc(100vh-160px)] max-h-[calc(100vh-160px)] overflow-y-scroll'>
                        {
                            !loading && (
                                <div className='text-xl md:text-3xl font-medium px-12 pt-4'>Search Results:- {data.length}</div>
                            )
                        }
                        {
                            data.length !== 0 && !loading && (
                                <VerticalSearchCard loading={loading} data={data} />
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
