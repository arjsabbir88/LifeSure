import React from 'react'
import { Link } from 'react-router'

const ManagePolicies = () => {
  return (
    <div>
      this is manage policies page
      <Link to= 'add-policy'
      className='btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black'>Add Policy</Link>
    </div>
  )
}

export default ManagePolicies
