import summaryApi from "../common";
import {toast} from 'react-toastify';

const addToCart = async(e,id) => {
    e?.stopPropagation();
    e?.preventDefault();
    const responseData = await fetch(summaryApi.addToCartProduct.url,{
        method : summaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            productId : id,
        })
    })

    const addToCartProduct = await responseData.json();

    if(addToCartProduct.success){
        toast.success(addToCartProduct.message);
    }

    if(addToCartProduct.error){
        toast.error(addToCartProduct.message);
    }

    return addToCartProduct;
}

export default addToCart;