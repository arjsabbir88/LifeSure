import { useContext, useState } from "react";
import {
  Bell,
  Search,
  User,
  Home,
  Menu,
  X,
  LayoutDashboard,
  Warehouse,
  Users,
  Lightbulb,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.svg";
import { AuthContext } from "@/authProvider/AuthProvider";
import { toast } from "sonner";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  // console.log(user)

  const auth = (
    <>
      <Link
        className="btn btn-soft btn-success px-6 rounded-lg bg-gradient-to-r hover:from-green-600 hover:to-green-800 hover:text-white text-black"
        to="/auth/login"
      >
        Sign In
      </Link>
      <Link
        className="btn btn-soft btn-success px-6 rounded-lg bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
        to="/auth/register"
      >
        Sign In
      </Link>
    </>
  );

  const links = (
    <>
      <NavLink to="/" className="flex items-center gap-1 hover:text-green-600">
        <Home size={16} /> Home
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className="flex items-center gap-1 hover:text-green-600"
        >
          <LayoutDashboard size={16} />
          Dashboard{" "}
        </NavLink>
      )}
      <NavLink
        to="/policies"
        className="flex items-center gap-1 hover:text-green-600"
      >
        <Warehouse size={16} />
        Policies{" "}
      </NavLink>
      <NavLink
        to="/agents"
        className="flex items-center gap-1 hover:text-green-600"
      >
        <Users size={16} />
        Agents{" "}
      </NavLink>
      <NavLink
        to="/faqs"
        className="flex items-center gap-1 hover:text-green-600"
      >
        <Lightbulb size={16} />
        FAQs{" "}
      </NavLink>
      <NavLink
        to="/blogs"
        className="flex items-center gap-1 hover:text-green-600"
      >
        <Lightbulb size={16} />
        Blogs{" "}
      </NavLink>
    </>
  );

  const handleLogOut = () => {
    logout()
      .then((res) => {
        toast.success("User Logout Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

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
          <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-700">
            {links}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Bell */}
            <div className="hidden lg:block relative cursor-pointer">
              <Bell className="text-gray-700" size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                3
              </span>
            </div>

            {/* Avatar */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 text-white flex items-center justify-center hover:cursor-pointer"
                >
                  {user?.photoURL ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <User size={18} />
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 text-sm">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </a>
                    <hr />
                    <button
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-red-500 hover:bg-red-50 w-full"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              auth
            )}

            {/* Hamburger menu (shown on mobile) */}
            <button
              className="lg:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {mobileMenuOpen && (
          <div className="mt-4 lg:hidden flex flex-col gap-2 text-sm font-medium text-gray-700">
            {links}
          </div>
        )}
      </div>
    </nav>
  );
}
