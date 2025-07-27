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
import AdminRouter from "@/routers/AdminRouter";
import Forbidden from "@/Error/Forbidden";
import AgentRouter from "@/routers/AgentRouter";
import ErrorPage from "@/Error/ErrorPage";
import MyPolicy from "@/dashboard/customer/myPolicy/MyPolicy";

export const Router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/policies",
        Component: Policies,
        loader: () => fetch("http://localhost:3000/policies"),
      },
      {
        path: "/policiesDetails/:id",
        element: <PrivetRoute>
          <PolicyDetails/>
        </PrivetRoute>,
        // Component: PolicyDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/policies/${params.id}`),
      },
      {
        path: "/agents",
        Component: Agents,
      },
      {
        path: "/agent-application",
        element: <PrivetRoute>
          <AgentApplicationForm/>
        </PrivetRoute>
        // Component: AgentApplicationForm,
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
        Component: Blogs,
      },
      {
        path: "/blogs/details/:id",
        element: (
          <PrivetRoute>
            <LatestBlogsDetails></LatestBlogsDetails>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/blogs/details/${params.id}`),
      },
      {
        path: "/profile",
        element: (
          <PrivetRoute>
            <Profile></Profile>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard",
        element: <PrivetRoute>
          <Dashboard/>
        </PrivetRoute>,
        // Component: Dashboard,
        children: [
          // addmin dashboard

          {
            index: true,
            Component: AdminDashboard,
          },
          {
            path: "/dashboard/manage-application",
            element: (
              <AdminRouter>
                <ManageApplications></ManageApplications>
              </AdminRouter>
            ),
            // Component: ManageApplications
          },
          {
            path: "/dashboard/manage-application/:id",
            element: (
              <AdminRouter>
                <ApplicationDetails />
              </AdminRouter>
            ),
            // Component: ApplicationDetails
          },
          {
            path: "admin/dashboard/manage-policies",
            element: (
              <AdminRouter>
                <ManagePolicies />
              </AdminRouter>
            ),
            // Component: ManagePolicies,
          },
          {
            path: "/dashboard/admin/dashboard/manage-policies/add-policy",
            element: (
              <AdminRouter>
                <AddPolicy />
              </AdminRouter>
            ),
            // Component: AddPolicy,
          },
          {
            path: "/dashboard/manage-user",
            element: (
              <AdminRouter>
                <ManageUser></ManageUser>
              </AdminRouter>
            ),
            // Component: ManageUser
          },
          {
            path: "/dashboard/manage-transactions",
            element: (
              <AdminRouter>
                <ManageTransactions />
              </AdminRouter>
            ),
            // Component: ManageTransactions
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
            Component: AddBlogs,
          },
          {
            path: "/dashboard/agents",
            element: (
              <AdminRouter>
                <ManageAgents />
              </AdminRouter>
            ),
            // Component: ManageAgents
          },

          // agent dashboard
          {
            path: "/dashboard/assigned-customers",
            element: (
              <AgentRouter>
                <AssignedCustomers />
              </AgentRouter>
            ),
            // Component: AssignedCustomers,
          },
          {
            path: "/dashboard/manage-blogs",
            element: <AgentRouter>
              <ManageBlogs/>
            </AgentRouter>
            // Component: ManageBlogs,
          },

          // customer dashboard

          {
            path: "/dashboard/my-policy",
            element: <PrivetRoute>
              <MyPolicy/>
            </PrivetRoute>
            // Component: myPolicy,
          },
          {
            path: "/dashboard/claim-request",
            element: <PrivetRoute>
              <ClaimRequest/>
            </PrivetRoute>
            // Component: ClaimRequest,
          },
          {
            path: "/dashboard/payment-status",
            element: <PrivetRoute>
              <PaymentStatus/>
            </PrivetRoute>
            // Component: PaymentStatus,
          },
        ],
      },
    ],
  },
]);
