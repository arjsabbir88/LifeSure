import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CustomTooltip } from "@/components/Custom/tooltip/ToolTip";

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/transactions");
      return res.data;
    },
  });
  console.log(transactions)

  const totalIncome = transactions.reduce((sum, trx) => sum + trx.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-950">
          💳 Manage Transactions
        </h2>
        <p className="text-gray-600">Track all Stripe payments made by users</p>
      </div>

      {/* Total Earnings Summary */}
      <div className="flex justify-around">
        <Card className="bg-green-100 text-green-950">
          <CardContent className="p-4 flex items-center">
            <span className="font-semibold">Total Transaction:</span>
            <span className="text-xl font-bold">${totalIncome}</span>
          </CardContent>
        </Card>
        <Card className="bg-green-100 text-green-900">
          <CardContent className="p-4 flex items-center">
            <span className="font-semibold">Total Income:</span>
            <span className="text-xl font-bold"> {transactions.length}</span>
          </CardContent>
        </Card>
      </div>

      {/* Filter buttons (placeholder) */}
      {/* <div className="flex flex-wrap gap-3">
        <button className="bg-green-600 text-white px-4 py-1 rounded-md">Filter by Date</button>
        <button className="bg-green-600 text-white px-4 py-1 rounded-md">Filter by User</button>
        <button className="bg-green-600 text-white px-4 py-1 rounded-md">Filter by Policy</button>
      </div> */}
      <div className="flex flex-wrap gap-4">
        {/* Filter by Date (static for now) */}
        <select className="bg-green-100 text-green-900 px-4 py-2 rounded-md">
          <option disabled selected>
            Filter by Date
          </option>
          <option value="today">Today</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
        </select>

        {/* Filter by User (dummy for now) */}
        <select className="bg-green-100 text-green-900 px-4 py-2 rounded-md">
          <option disabled selected>
            Filter by User
          </option>
          <option value="user1">user1@example.com</option>
          <option value="user2">user2@example.com</option>
          <option value="user3">user3@example.com</option>
        </select>

        {/* Filter by Policy (dummy for now) */}
        <select className="bg-green-100 text-green-900 px-4 py-2 rounded-md">
          <option disabled selected>
            Filter by Policy
          </option>
          <option value="Healthy Future Plan">Healthy Future Plan</option>
          <option value="Total Family Guard">Total Family Guard</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-green-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-sm">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="p-2 text-left">Transaction ID</th>
                <th className="p-2 text-left">User Email</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Policy</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx._id} className="border-b hover:bg-green-50">
                  <td className="p-2">{trx.transactionId}</td>
                  <td className="p-2">{trx.email}</td>
                  <td className="p-2">{trx.name}</td>
                  <td className="p-2">{trx.policeName}</td>
                  <td className="p-2">${trx.amount}</td>
                  <td className="p-2">{trx.paymentMethod?.[0] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Optional: Chart */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-700 mb-2">
          📈 Earnings Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transactions}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManageTransactions;
