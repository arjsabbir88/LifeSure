import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/Custom/hero/heroSlider/HeroSlider";
import axios from "axios";
import MostPurchasedPolicies from "../mostPurchasedPolicies/MostPurchasedPolicies";
import LifeSureBenefits from "../benefitsOfLifeSure/LifeSureBenefits";

const Home = () => {
  const [mostPurchased, setMostPurchased] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/top-policies")
      .then((res) => {
        console.log(res.data);
        setMostPurchased(res.data)
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div>
        <HeroSlider />
        <MostPurchasedPolicies mostPurchased={mostPurchased}/>
        <LifeSureBenefits/>
      </div>
    </div>
  );
};

export default Home;
