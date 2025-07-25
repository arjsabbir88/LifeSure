import React from 'react'
import { Link } from 'react-router'

const Agents = () => {
  return (
    <div className='bg-[#f0fdf4] min-h-screen'>
      this is agents page
      <Link
          to='/agent-application'
          className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
        >
          Apply For Agent
        </Link>
    </div>
  )
}

export default Agents
