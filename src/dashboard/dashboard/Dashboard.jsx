import { AuthContext } from "@/authProvider/AuthProvider";
import Loader from "@/components/Custom/loader/Loader";
import { Button } from "@/components/ui/button";
import useUserRole from "@/hooks/useUserRole";
import { Bell, MessageCircle, Menu, X, Siren, GitPullRequestDraft, CircleDollarSign, UserPen, House, Users, FileUser, UserCog, FileStack, ShieldUser, LayoutGrid, BadgeDollarSign } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { toast } from "sonner"

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {logout} = useContext(AuthContext)

   useEffect(() => {
      document.title = "Dashboard | LifeSure";
    }, []);

  if (roleLoading || loading) {
    return <Loader />;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = ()=>{

    logout().then((res)=>{
      toast.success("user Logout Successfully");
    }).catch(err=>{
      toast.error(err.message);
    })
  }

  return (
    <div className="flex h-screen bg-green-50">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar - Hidden on mobile by default, shown on desktop */}
      <div
        className={`${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed lg:translate-x-0 lg:static z-50 h-full w-64 md:w-72 bg-green-900 text-white 
        transition-transform duration-300 ease-in-out transform lg:transform-none`}
      >
        <div className="flex flex-col justify-between h-full p-6">
          {/* Top Section */}
          <div>
            <div className="flex justify-between">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-2xl md:text-3xl font-bold mb-8 block bg-gradient-to-r from-green-400 to-indigo-500 bg-clip-text text-transparent"
              >
                LifeSure
              </Link>
              <button className="text-white md:hidden pb-10 hover:text-red-600 hover:cursor-pointer" onClick={closeMobileMenu}>
                <X />
              </button>
            </div>

            <ul className="menu space-y-2">
              {role?.toLowerCase() === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/manage-application"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                      <LayoutGrid />Manage Applications
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-user"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                      <ShieldUser />Manage Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="admin/dashboard/manage-policies"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                     <FileStack /> Manage Policies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-transactions"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                     <BadgeDollarSign /> Manage Transactions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/agents"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                     <UserCog /> Manage Agents
                    </Link>
                  </li>
                </>
              )}

              {role?.toLowerCase() === "agent" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/assigned-customers"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                     <Users /> Assigned Customers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-blogs"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                     <FileUser /> Manage Blogs
                    </Link>
                  </li>
                </>
              )}

              {role?.toLowerCase() === "customer" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/my-policy"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                      <Siren />My Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/claim-request"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                      <GitPullRequestDraft />Claim Request
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/payment-status"
                      onClick={closeMobileMenu}
                      className="text-white hover:bg-green-800"
                    >
                     <CircleDollarSign /> Payment Status
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Bottom User Info Section */}
          <div className="pt-6 border-t border-green-700">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-sm truncate">
                  {user?.displayName || "User"}
                </h4>
                <p className="text-xs text-green-200 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-1 text-sm">
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="hover:text-green-400 transition-colors flex items-center gap-2"
              >
                <UserPen />View Profile
              </Link>
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="hover:text-green-400 transition-colors flex items-center gap-2"
              >
                <House />Back to Home
              </Link>
              <Button className="bg-green-600 hover:bg-green-500 hover:cursor-pointer" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex items-center space-x-4">
              <Bell className="text-gray-600 cursor-pointer" size={20} />
              <MessageCircle
                className="text-gray-600 cursor-pointer"
                size={20}
              />
            </div>
          </div>
        </header>

        {/* Desktop Top Bar */}
        <div className="hidden lg:flex items-center justify-between p-6 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600 cursor-pointer" size={20} />
            <MessageCircle className="text-gray-600 cursor-pointer" size={20} />
          </div>
          <div className="flex items-center space-x-3">
            <img
              src={user?.photoURL || "https://via.placeholder.com/32"}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-green-200 object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              {user?.displayName || "User"}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-green-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
