import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
