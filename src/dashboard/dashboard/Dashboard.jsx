import React from "react";
import { Link } from "react-router";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open bg-green-100">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div>
          <Outlet />
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-green-300 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link> Manage Applications</Link>
          </li>
          <li>
            <Link>Manage Users</Link>
          </li>

          <li>
            <Link to="admin/dashboard/manage-policies">Manage Policies</Link>
          </li>
          <li>
            <Link>Manage Transactions</Link>
          </li>
          <li>
            <Link> Manage Agents</Link>
          </li>
          <li>
            <Link to="/dashboard/review">Review</Link>
          </li>
          <li>
            <Link to="/dashboard/blogs">Add Blog</Link>
          </li>
          <li>
            <Link to="/dashboard/my-policy">My Policy</Link>
          </li>
          <li>
            <Link to="/dashboard/claim-request">Claim Request</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
