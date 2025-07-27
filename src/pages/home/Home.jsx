import React, { useContext, useEffect, useState } from "react";
import HeroSlider from "../../components/Custom/hero/heroSlider/HeroSlider";
import MostPurchasedPolicies from "../mostPurchasedPolicies/MostPurchasedPolicies";
import LifeSureBenefits from "../benefitsOfLifeSure/LifeSureBenefits";
import ReviewSection from "../review/ReviewSection";
import LatestBlogs from "../blogs/LatestBlogs";
import NewsLetter from "@/components/newsLetter/NewsLetter";
import { useQuery } from "@tanstack/react-query";
import AgentMarquee from "../agents/AgentsMarquee";
import useUserRole from "@/hooks/useUserRole";
import Loader from "@/components/Custom/loader/Loader";
import useAxios from "@/hooks/useAxios";

const Home = () => {
  const { role, roleLoading } = useUserRole();
  const axiosInstance = useAxios();

  useEffect(() => {
    document.title = "Home | LifeSure";
  }, []);

  const { data: mostPurchased = [], isLoading } = useQuery({
    queryKey: ["mostPurchased-Policy"],
    queryFn: async () => {
      const res = await axiosInstance("/top-policies");
      return res.data;
    },
  });

  if (roleLoading || isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-full min-h-screen">
      <div>
        <HeroSlider />
        <MostPurchasedPolicies mostPurchased={mostPurchased} />
        <LifeSureBenefits />
        <ReviewSection></ReviewSection>
      </div>
      <div>
        <LatestBlogs />
      </div>
      <div>
        <NewsLetter />
      </div>
      <div>
        <AgentMarquee></AgentMarquee>
      </div>
    </div>
  );
};

export default Home;
