import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isForbidden = location.pathname.startsWith("/forbidden");

  const hideNavBar = isDashboard || isForbidden;

  return (
    <div className="min-h-screen bg-white">
      <div className="shadow sticky top-0 z-40">{!hideNavBar && <NavBar />}</div>
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
