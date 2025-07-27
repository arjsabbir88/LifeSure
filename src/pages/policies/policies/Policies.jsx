import React, { useEffect } from "react";
import InsurancePolicies from "./InsurancePolicies";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import Loader from "@/components/Custom/loader/Loader";

const Policies = () => {
  const axiosInstance = useAxios();
 useEffect(() => {
    document.title = "Policies | LifeSure";
  }, []);
  const {
    data: insurancePolicies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["insurancePolicies"],
    queryFn: async () => {
      const res = await axiosInstance("/policies");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to="/forbidden"></Navigate>;
  }

  return (
    <div className="min-h-screen">
      <InsurancePolicies
        insurancePolicies={insurancePolicies}
      ></InsurancePolicies>
    </div>
  );
};

export default Policies;
