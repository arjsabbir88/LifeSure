import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";



export const Router = createBrowserRouter([{
    path: '/',
    Component: Layout,
    children: [{
        index: true,
        Component: Home
    }]
}])