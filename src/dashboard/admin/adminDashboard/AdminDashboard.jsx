"use client";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  CircleDollarSign,
  FileWarning,
  Search,
  Bell,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { Link } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Dummy Data for charts
const revenueData = [
  { month: "Jan", revenue: 3000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 5200 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 7000 },
  { month: "Jun", revenue: 8500 },
];

const policyCategoryData = [
  { category: "Life", count: 120 },
  { category: "Health", count: 95 },
  { category: "Travel", count: 60 },
  { category: "Home", count: 45 },
];

const dashboardData = [
  {
    title: "Total Users",
    value: "1,240",
    icon: <Users className="text-blue-600 w-6 h-6" />,
  },
  {
    title: "Active Policies",
    value: "320",
    icon: <Shield className="text-green-600 w-6 h-6" />,
  },
  {
    title: "Total Revenue",
    value: "$42,560",
    icon: <CircleDollarSign className="text-yellow-600 w-6 h-6" />,
  },
  {
    title: "Claims Filed",
    value: "84",
    icon: <FileWarning className="text-red-600 w-6 h-6" />,
  },
];

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/transactions");
      return res.data;
    },
  });

  const totalIncome = transactions.reduce((sum, trx) => sum + trx.amount, 0);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-info");
      return res.data;
    },
  });

  const totalUser = users.length;

  const {
    data: policies = [],
  } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies");
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-40">
        <h2 className="text-xl font-semibold text-green-900">Home/Dashboard</h2>

        {/* Right-side controls */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 text-sm"
            />
          </div>

          {/* Icons */}
          <button className="hover:text-green-500">
            <Bell className="h-5 w-5" />
          </button>
          <button className="hover:text-green-500">
            <MessageCircle className="h-5 w-5" />
          </button>

          {/* Profile image */}
          <Link to="/profile">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-green-300"
            />
          </Link>
        </div>
      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <motion.div
          // key={item.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.6, delay: index * 0.2 }}
        > */}

        {/* total user */}
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="text-blue-600 w-6 h-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{totalUser}</div>
          </CardContent>
        </Card>

        {/* total revinew */}
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <CircleDollarSign className="text-yellow-600 w-6 h-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              ${totalIncome}
            </div>
          </CardContent>
        </Card>

        {/* total active policy */}
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Policies
            </CardTitle>
            <Shield className="text-green-600 w-6 h-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {policies.length}
            </div>
          </CardContent>
        </Card>
        {/* </motion.div> */}
      </div>

      {/* Line Chart: Revenue */}
      <Card className="rounded-2xl shadow-md p-4">
        <CardTitle className="text-lg mb-4">Revenue Over Time</CardTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bar Chart: Policy Categories */}
      <Card className="rounded-2xl shadow-md p-4">
        <CardTitle className="text-lg mb-4">Policies by Category</CardTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={policyCategoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
