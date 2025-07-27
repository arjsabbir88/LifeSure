import { AuthContext } from "@/authProvider/AuthProvider";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://life-sure-server-omega.vercel.app`,
});

const useAxiosSecure = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const setInterceptor = async () => {
      if (user) {
        const token = await user.getIdToken();

        axiosSecure.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      }
    };

    setInterceptor();
  }, [user]);

  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error?.response?.status;
      
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => navigate("/auth/login"))
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

