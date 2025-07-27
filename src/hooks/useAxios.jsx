import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://life-sure-server-omega.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;