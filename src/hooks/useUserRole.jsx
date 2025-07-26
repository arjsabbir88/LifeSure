import { AuthContext } from '@/authProvider/AuthProvider'
import React, { useContext } from 'react'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {

    const {user,loading:authLoading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: role, isLoading:roleLoading,refetch} = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user-info/${user.email}`);
            return res.data.role
        }
    })

    return {role,roleLoading: authLoading || roleLoading, refetch}
}

export default useUserRole
