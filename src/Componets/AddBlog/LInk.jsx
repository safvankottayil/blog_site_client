import React from 'react'
import { Link } from 'react-router-dom'

function LInk({url,colortext,text}) {
  return (
    <span className='text-lg font-display'><Link className='text-blue-600 ' to={url}>{colortext}</Link> {text}</span>
  )
}

export default LInk
