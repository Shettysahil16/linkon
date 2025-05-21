import summaryApi from "../common";

const fetchCategoryWiseProduct = async(category) => {
    const dataResponse = await fetch(summaryApi.productCategoryWise.url,{
        method : summaryApi.productCategoryWise.method,
        credentials: 'include',
        headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({category}),
    })
    const categoryProduct = await dataResponse.json();
    return categoryProduct
}

export default fetchCategoryWiseProduct;