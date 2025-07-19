import React from 'react'
import { HashLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <HashLoader size={100} color='#008a12'/>
    </div>
  )
}

export default Loader
