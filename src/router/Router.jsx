import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Policies from "../pages/policies/policies/Policies";
import PolicyDetails from "../pages/policies/PolicyDetails/PolicyDetails";
import Agents from "../pages/agents/Agents";
import FAQs from "../pages/faqs/FAQs";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import Dashboard from "../dashboard/dashboard/Dashboard";
import AdminDashboard from "../dashboard/admin/adminDashboard/AdminDashboard";
import ManagePolicies from "../dashboard/admin/managePolicies/ManagePolicies";
import AddPolicy from "../dashboard/admin/addPolicy/AddPolicy";

export const Router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/policies",
        Component: Policies,
      },
      {
        path: "/policiesDetails",
        Component: PolicyDetails,
      },
      {
        path: "/agents",
        Component: Agents,
      },
      {
        path: "/faqs",
        Component: FAQs,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
        children: [
          {
            index: true,
            Component: AdminDashboard,
          },
          {
            path: "admin/dashboard/manage-policies",
            Component: ManagePolicies,
          },
          {
            path: "/dashboard/admin/dashboard/manage-policies/add-policy",
            Component: AddPolicy,
          }
        ],
      },
    ],
  },
]);
