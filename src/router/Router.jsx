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
import Review from "@/pages/review/Review";
import PrivetRoute from "@/hooks/PrivetRoute";
import AddBlogs from "@/dashboard/admin/addBlogs/AddBlogs";
import LatestBlogsDetails from "@/pages/blogs/LatestBlogsDetails";
import Blogs from "@/pages/blogs/Blogs";
import Profile from "@/pages/profile/Profile";
import myPolicy from "@/dashboard/customer/myPolicy/MyPolicy";
import ClaimRequest from "@/dashboard/customer/claimRequest/ClaimRequest";
import PaymentStatus from "@/dashboard/customer/payment/PaymentStatus";
import ManageUser from "@/dashboard/admin/manageUser/ManageUser";
import ManageTransactions from "@/dashboard/admin/manageTransactions/ManageTransactions";
import ManageApplications from "@/dashboard/admin/manageApplication/ManageApplication";
import AgentApplicationForm from "@/pages/agents/CreateAgentForm";
import ApplicationDetails from "@/dashboard/admin/manageApplication/ApplicationDetails";
import ManageAgents from "@/dashboard/admin/manageAgent/ManageAgents";
import AssignedCustomers from "@/dashboard/agent/assignedCustomer/AssignedCustomers";
import ManageBlogs from "@/dashboard/agent/manageBlogs/ManageBlogs";

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
        loader: () => fetch("http://localhost:3000/policies"),
      },
      {
        path: "/policiesDetails/:id",
        Component: PolicyDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/policies/${params.id}`),
      },
      {
        path: "/agents",
        Component: Agents,
      },
      {
        path: '/agent-application',
        Component: AgentApplicationForm
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
        path: "/blogs",
        Component: Blogs
      },
      {
        path: '/blogs/details/:id',
        element: <PrivetRoute>
          <LatestBlogsDetails></LatestBlogsDetails>
        </PrivetRoute>,
        loader: ({params})=> fetch(`http://localhost:3000/blogs/details/${params.id}`)
      },
      {
        path: '/profile',
        element: <PrivetRoute>
          <Profile></Profile>
        </PrivetRoute>
      },
      {
        path: "/dashboard",
        Component: Dashboard,
        children: [

          // addmin dashboard

          {
            index: true,
            Component: AdminDashboard,
          },
          {
            path: '/dashboard/manage-application',
            Component: ManageApplications
          },
          {
            path: '/dashboard/manage-application/:id',
            Component: ApplicationDetails
          },
          {
            path: "admin/dashboard/manage-policies",
            Component: ManagePolicies,
          },
          {
            path: "/dashboard/admin/dashboard/manage-policies/add-policy",
            Component: AddPolicy,
          },
          {
            path: "/dashboard/manage-user",
            Component: ManageUser
          },
          {
            path: "/dashboard/manage-transactions",
            Component: ManageTransactions
          },
          {
            path: "/dashboard/review",
            element: (
              <PrivetRoute>
                <Review></Review>
              </PrivetRoute>
            ),
          },
          {
            path: "/dashboard/blogs",
            Component: AddBlogs
          },
          {
            path: '/dashboard/agents',
            Component: ManageAgents
          },

          // agent dashboard
          {
            path: '/dashboard/assigned-customers',
            Component: AssignedCustomers,
          },
          {
            path: '/dashboard/manage-blogs',
            Component: ManageBlogs
          },


          // customer dashboard

          {
            path: '/dashboard/my-policy',
            Component: myPolicy
          },
          {
            path: '/dashboard/claim-request',
            Component: ClaimRequest
          },
          {
            path: '/dashboard/payment-status',
            Component: PaymentStatus
          }
        ],
      },
    ],
  },
]);
