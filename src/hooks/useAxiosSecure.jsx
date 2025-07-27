// import { AuthContext } from "@/authProvider/AuthProvider";
// import axios from "axios";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router";

// const axiosSecure = axios.create({
//   baseURL: `http://localhost:3000`,
// });

// const useAxiosSecure = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   axiosSecure.interceptors.request.use(
//     (config) => {
//       config.headers.Authorization = `Bearer ${user?.accessToken}`;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axiosSecure.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     (error) => {
//       const status = error?.response?.status;
//       console.log(status)
//       if (status === 403) {
//         navigate("/forbidden");
//       } else if (status === 401) {
//         logout()
//           .then(() => {
//             navigate("/auth/login");
//           })
//           .catch(() => {});
//       }

//       return Promise.reject(error);
//     }
//   );

//   return axiosSecure;
// };

// export default useAxiosSecure;


import { AuthContext } from "@/authProvider/AuthProvider";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
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
      console.log(status);
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

