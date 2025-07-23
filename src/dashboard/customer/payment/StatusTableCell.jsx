import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

import {
  CreditCard,
  Download,
  Eye,
  MoreHorizontal,
  Receipt,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PayNowModal from "./PayNowModal";

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const StatusTableCell = ({ policy ,refetch}) => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);




  const handleConfirmPayment = async () => {
  try {
    // const res = await axiosSecure.post("/create-checkout-session", {
    //   email: user.email,
    //   amount: selectedPolicy.policyDetails.premiumAmount,
    //   bookingPolicyId: selectedPolicy._id,
    // });

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: res.data.id });
  } catch (err) {
    console.error("Payment error", err);
  }
};


  const handlePayNow = (policyId) => {
    const found = policyId;
    setSelectedPolicy(found);
    setModalOpen(true);
  };

  console.log(policy);
  return (
    <TableRow key={policy._id} className="hover:bg-muted/50">
      <TableCell>
        <div className="space-y-1">
          <div className="font-medium">{policy.policyDetails.policyTitle}</div>
          <div className="text-sm text-muted-foreground">
            {policy.policyDetails._id}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">
        ${policy.estimatedPremiumMonthly}/Monthly
      </TableCell>
      <TableCell>{getStatusBadge(policy?.paymentStatus)}</TableCell>
      <TableCell>
        <div className="text-sm">{formatDate(policy?.dueDate)}</div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          {policy?.paidDate ? formatDate(payment.paidDate) : "-"}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {policy.status === "paid" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadReceipt(policy.id)}
            >
              <Receipt className="h-4 w-4 mr-1" />
              Receipt
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => handlePayNow(policy)}
              className={
                policy?.paymentStatus === "Due"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
            >
              <CreditCard className="h-4 w-4 mr-1" />
              Pay Now
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewDetails(policy.id)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {policy.status === "paid" && (
                <DropdownMenuItem
                  onClick={() => handleDownloadReceipt(policy.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Contact Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>

      <PayNowModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmPayment}
        policy={selectedPolicy}
        refetch={refetch}
      />
    </TableRow>
  );
};

export default StatusTableCell;
