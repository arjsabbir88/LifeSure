import React, { useContext, useEffect, useState } from "react";
import HeroSlider from "../../components/Custom/hero/heroSlider/HeroSlider";
import axios from "axios";
import MostPurchasedPolicies from "../mostPurchasedPolicies/MostPurchasedPolicies";
import LifeSureBenefits from "../benefitsOfLifeSure/LifeSureBenefits";
import ReviewSection from "../review/ReviewSection";
import LatestBlogs from "../blogs/LatestBlogs";
import NewsLetter from "@/components/newsLetter/NewsLetter";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/authProvider/AuthProvider";
import AgentMarquee from "../agents/AgentsMarquee";
import useUserRole from "@/hooks/useUserRole";
import Loader from "@/components/Custom/loader/Loader";

const Home = () => {
  const [mostPurchased, setMostPurchased] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {role,roleLoading} = useUserRole()

  console.log(role)

  useEffect(() => {
    axios("http://localhost:3000/top-policies")
      .then((res) => {
        console.log(res.data);
        setMostPurchased(res.data)
      })
      .catch((err) => console.log(err.message));
  }, []);

  if(roleLoading){
    return <Loader></Loader>
  }

  return (
    <div className="w-full min-h-screen">
      <div>
        <HeroSlider />
        <MostPurchasedPolicies mostPurchased={mostPurchased}/>
        <LifeSureBenefits/>
        <ReviewSection></ReviewSection>
      </div>
      <div>
        <LatestBlogs/>
      </div>
      <div>
        <NewsLetter/>
      </div>
      <div>
        <AgentMarquee></AgentMarquee>
      </div>
    </div>
  );
};

export default Home;
