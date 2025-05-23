import React from 'react';
import PropTypes from 'prop-types';
import { ImCancelCircle } from "react-icons/im";

function DisplayImage({
  imageUrl,
  onClose,
}) {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-20'>
      <div className='bg-white shadow-2xl min-w-2xl mx-auto p-2'>
        <div className='w-fit ml-auto text-3xl hover:text-red-500 cursor-pointer' onClick={onClose}>
          <ImCancelCircle />
        </div>
        <div className='max-h-[80vh] flex justify-center p-2'>
          <img src={imageUrl} alt="product image" className='h-[75vh]' />
        </div>
      </div>
    </div>
  )
}

DisplayImage.propTypes = {
  imageUrl: PropTypes.string,
  onClose: PropTypes.func
}

export default DisplayImage
