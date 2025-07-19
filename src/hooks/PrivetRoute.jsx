import { AuthContext } from '@/authProvider/AuthProvider'
import Loader from '@/components/Custom/loader/Loader';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const navigate = useNavigate()

    if(loading){
        return <Loader/>
    }
    if(!user){
        return navigate('/auth/login')
    }
  return children
}

export default PrivetRoute
