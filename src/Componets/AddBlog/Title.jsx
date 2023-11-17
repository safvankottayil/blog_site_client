import React from 'react'

function Title({value}) {
  return (
    <div className='flex font-bold text-2xl md:px-8 break-words pt-3 pb-2 '>
      {value}
    </div>
  )
}

export default Title
