import { useState } from "react";
import { Bell, Search, User, Home, Mail, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.svg";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = (
    <>
      <NavLink to="/" className="flex items-center gap-1 hover:text-green-600">
        <Home size={16} /> Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className="flex items-center gap-1 hover:text-green-600"
      >
        Dashboard{" "}
      </NavLink>
      <NavLink
        to="/policies"
        className="flex items-center gap-1 hover:text-green-600"
      >
        Policies{" "}
      </NavLink>
      <NavLink
        to="/agents"
        className="flex items-center gap-1 hover:text-green-600"
      >
        Agents{" "}
      </NavLink>
      <NavLink
        to="/faqs"
        className="flex items-center gap-1 hover:text-green-600"
      >
        FAQs{" "}
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white border-b shadow-sm px-4 md:px-6 py-3">
      <div className="max-w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Left: Brand */}
          <Link to="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-9 h-9 mr-3">
                <img src={logo} alt="" />
              </div>
              <h1 className="text-2xl font-bold animate__animated animate__fadeInUp bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
                LifeSure
              </h1>
            </div>
          </Link>

          {/* Center: Nav links (hidden on mobile) */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            {links}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search bar (hidden on mobile) */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-gray-500"
              />
            </div>

            {/* Bell */}
            <div className="relative cursor-pointer">
              <Bell className="text-gray-700" size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                3
              </span>
            </div>

            {/* Avatar */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 text-white flex items-center justify-center"
              >
                <User size={18} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 text-sm">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                  <hr />
                  <a
                    href="#"
                    className="block px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* Hamburger menu (shown on mobile) */}
            <button
              className="md:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden flex flex-col gap-2 text-sm font-medium text-gray-700">
            {links}
          </div>
        )}
      </div>
    </nav>
  );
}
