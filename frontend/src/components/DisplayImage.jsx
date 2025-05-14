import React from 'react';
import PropTypes from 'prop-types';
import { ImCancelCircle } from "react-icons/im";

function DisplayImage({
    imageUrl,
    onClose,
}) {
  return (
    <div className='h-full w-full fixed top-0 bottom-0 left-0 flex justify-center items-center z-20'>
      <div className='bg-white shadow-2xl w-full max-w-[80vh] h-full max-h-[80vh] mx-auto p-2'>
        <ImCancelCircle className='hover:text-red-500 cursor-pointer text-3xl w-fit block ml-auto' onClick={onClose}/>
      <img src={imageUrl} alt="product image" className='h-full w-full'/>
      </div>
    </div>
  )
}

DisplayImage.propTypes = {
    imageUrl : PropTypes.string,
    onClose : PropTypes.func
}

export default DisplayImage
