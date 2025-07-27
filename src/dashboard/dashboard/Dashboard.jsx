// import { AuthContext } from "@/authProvider/AuthProvider";
// import Loader from "@/components/Custom/loader/Loader";
// import useUserRole from "@/hooks/useUserRole";
// import React, { useContext } from "react";
// import { Link } from "react-router";
// import { Outlet } from "react-router";

// const Dashboard = () => {
//   const { user, loading } = useContext(AuthContext);
//   const { role, roleLoading } = useUserRole();

//   if (roleLoading || loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="drawer lg:drawer-open bg-green-100">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content">
//         <div>
//           <Outlet />
//         </div>
//         <label
//           htmlFor="my-drawer-2"
//           className="btn btn-primary drawer-button lg:hidden"
//         >
//           Open drawer
//         </label>
//       </div>
//       <div className="drawer-side bg-green-950 max-w-3xl text-white px-10">
//         <div>
//           <label
//             htmlFor="my-drawer-2"
//             aria-label="close sidebar"
//             className="drawer-overlay"
//           ></label>

//           <Link to="/" className="text-2xl font-bold animate__animated animate__fadeInUp bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent my-10 border-b-2">
//             LifeSure
//           </Link>

//           {role.toLowerCase() === "admin" && (
//             <ul>
//               <li>
//                 <Link to="/dashboard/manage-application">
//                   {" "}
//                   Manage Applications
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/manage-user">Manage Users</Link>
//               </li>

//               <li>
//                 <Link to="admin/dashboard/manage-policies">
//                   Manage Policies
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/manage-transactions">
//                   Manage Transactions
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/agents"> Manage Agents</Link>
//               </li>
//             </ul>
//           )}

//           {role.toLowerCase() === "agent" && (
//             <ul>
//               <li>
//                 <Link to="/dashboard/assigned-customers">
//                   Assigned Customer
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/manage-blogs">Manage Blogs</Link>
//               </li>
//             </ul>
//           )}

//           {role.toLowerCase() === "customer" && (
//             <ul className="menu bg-green-300 text-base-content min-h-full w-80 p-4">
//               <li>
//                 <Link to="/dashboard/my-policy">My Policy</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/claim-request">Claim Request</Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/payment-status">Payment Status</Link>
//               </li>
//             </ul>
//           )}
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="flex">
//             <img
//               src={user?.photoURL}
//               alt=""
//               className="w-12 h-12 rounded-full border-2"
//             />
//             <div>
//               <h4>{user?.displayName}</h4>
//               <p className="text-xs">{user?.email}</p>
//             </div>
//           </div>
//           <Link className="hover:text-" to="/profile">
//             Profile
//           </Link>
//           <Link className="hover:text-" to="/">
//             Back Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { AuthContext } from "@/authProvider/AuthProvider";
import Loader from "@/components/Custom/loader/Loader";
import useUserRole from "@/hooks/useUserRole";
import { Bell, MessageCircle, Search } from "lucide-react";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  console.log(role)

  if (roleLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="drawer lg:drawer-open bg-green-50 min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mt-4"
        >
          Open drawer
        </label>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-green-900 text-white">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="min-h-full w-80 flex flex-col justify-between p-6">
          {/* Top Section */}
          <div>
            <Link
              to="/"
              className="text-3xl font-bold mb-10 block bg-gradient-to-r from-green-400 to-indigo-500 bg-clip-text text-transparent"
            >
              LifeSure
            </Link>

            <ul className="menu space-y-2">
              {role.toLowerCase() === "admin" && (
                <>
                  <li>
                    <Link to="/dashboard/manage-application">
                      Manage Applications
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage-user">Manage Users</Link>
                  </li>
                  <li>
                    <Link to="admin/dashboard/manage-policies">
                      Manage Policies
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage-transactions">
                      Manage Transactions
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/agents">Manage Agents</Link>
                  </li>
                </>
              )}

              {role.toLowerCase() === "agent" && (
                <>
                  <li>
                    <Link to="/dashboard/assigned-customers">
                      Assigned Customers
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage-blogs">Manage Blogs</Link>
                  </li>
                </>
              )}

              {role.toLowerCase() === "customer" && (
                <>
                  <li>
                    <Link to="/dashboard/my-policy">My Policy</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/claim-request">Claim Request</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/payment-status">Payment Status</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Bottom User Info Section */}
          <div className="pt-6 border-t border-green-700">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <h4 className="font-semibold">{user?.displayName}</h4>
                <p className="text-xs text-green-200">{user?.email}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                to="/profile"
                className="hover:text-green-400 transition text-sm"
              >
                View Profile
              </Link>
              <Link to="/" className="hover:text-green-400 transition text-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
