import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Policies from "../pages/policies/policies/Policies";
import PolicyDetails from "../pages/policies/PolicyDetails/PolicyDetails";
import Agents from "../pages/agents/Agents";
import FAQs from "../pages/faqs/FAQs";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";

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
        path: '/policiesDetails',
        Component: PolicyDetails
      },
      {
        path: '/agents',
        Component: Agents
      },
      {
        path: '/faqs',
        Component: FAQs
      },
      {
        path: '/auth/login',
        Component: Login
      },
      {
        path: '/auth/register',
        Component: Register
      }
    ],
  },
]);
