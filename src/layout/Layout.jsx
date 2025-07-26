import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-white">
      <div>{!isDashboard && <NavBar />}</div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
