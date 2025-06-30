import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory';
import summaryApi from '../common';
import VerticalSearchCard from '../components/VerticalSearchCard';

function CategoryProduct() {
    const params = useParams();
    //console.log(params.categoryName);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
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
        const {value, checked} = e.target;

        setSelectCategory((prev) => {
            return{
                ...prev,
                [value] : checked
            }
        })
    }

    const fetchData = async() => {
        const dataResponse = await fetch(summaryApi.filterProducts.url,{
            method : summaryApi.filterProducts.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({
                category : filterCategoryList,
            })
        })
        const filteredProducts = await dataResponse.json();

        if(filteredProducts?.success){
            setData(filteredProducts?.data || []);
            console.log("filteredProducts",filteredProducts);
            
        }
    }

    useEffect(() => {
        fetchData();
    },[filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if(selectCategory[categoryKeyName]){
                return categoryKeyName
            }
            return null
        }).filter(el => el);
        //console.log("arrayOfCategory", arrayOfCategory);
        setFilterCategoryList(arrayOfCategory);
        const urlFormat = arrayOfCategory.map((el,index) => {
            if((arrayOfCategory.length - 1) === index){
                return `category=${el}`
            }
            return `category=${el}&&`
        })
        //console.log(urlFormat);
        navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])
    
    return (
        <div>
            <div className='flex'>
                <div className='hidden md:flex flex-col gap-4 min-h-[calc(100vh-160px)] p-4 bg-white w-full max-w-[20%]'>
                    <div>
                        <h3 className='border-b-2 text-slate-500 font-medium text-2xl'>SORT BY :-</h3>
                        <form className='py-2 text-lg flex flex-col gap-2'>
                            <div className='flex gap-1'>
                                <input type="radio" name='sortBy' className='cursor-pointer'/>
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" name='sortBy' className='cursor-pointer'/>
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h3 className='border-b-2 text-slate-500 font-medium text-2xl'>FILTER :-</h3>
                        <form className='py-2 text-lg flex flex-col gap-2'>
                            {
                                productCategory.map((category,index) => {
                                    return(
                                        <div key={index} className='flex gap-1'>
                                            <input type="checkbox" name={"category"} value={category?.value} id={category?.value} checked={selectCategory[category?.value]} className='cursor-pointer' onChange={(e) => handleSelectCategory(e)}/>
                                            <label htmlFor={category?.value}>{category?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>
                <div className='h-full p-4 w-full '>
                    {
                        data.length !== 0 && !loading && (
                                <VerticalSearchCard loading={loading} data={data}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
