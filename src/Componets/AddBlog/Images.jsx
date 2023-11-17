import React from 'react'

function Image({IMG}) {
  return (
    <div className='flex flex-grow justify-center  bg-gray-300 rounded-md m-5  '>
        <img src={IMG} className='object-cover w-full rounded-md min-w-[650px]' alt="" />
    </div>
  )
}

export default Image
