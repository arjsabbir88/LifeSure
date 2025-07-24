"use client";

import { AuthContext } from "@/authProvider/AuthProvider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import StatusTableCell from "./StatusTableCell";

const getStatusBadge = (status) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Paid
        </Badge>
      );
    case "Due":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Due
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Overdue
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};


const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function PaymentStatus() {
  const handlePayNow = (paymentId) => {
    console.log(`Initiating payment for ${paymentId}`);
    // Add payment logic here
  };

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  const { isPanding, data: activePolicy = [] ,refetch} = useQuery({
    queryKey: ["my-policy", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/claim-request?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(activePolicy);

  const handleViewDetails = (paymentId) => {
    console.log(`Viewing details for ${paymentId}`);
    // Add view details logic here
  };

  const handleDownloadReceipt = (paymentId) => {
    console.log(`Downloading receipt for ${paymentId}`);
    // Add download logic here
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-[#f0fdf4]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payment Status</CardTitle>
          <CardDescription>
            Track your insurance premium payments and manage your policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">
                    Policy Details
                  </TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Due Date</TableHead>
                  <TableHead className="font-semibold">Paid Date</TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePolicy.map((policy) => (
                  <StatusTableCell key={policy._id} policy={policy}></StatusTableCell>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Total Paid
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {activePolicy
                    .filter((p) => p.status === "paid")
                    .reduce((sum, p) => sum + p.estimatedPremiumMonthly, 0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Pending Payments
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(
                    activePolicy
                      .filter((p) => p.paymentStatus === "Due")
                      .reduce((sum, p) => sum + p.estimatedPremiumMonthly, 0)
                  )} /Monthly
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Overdue Amount
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {activePolicy
                    .filter((p) => p.status === "overdue")
                    .reduce((sum, p) => sum + p.amount, 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
