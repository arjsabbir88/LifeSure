import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, ChevronDown } from "lucide-react";
import { Button, Dialog } from "@headlessui/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Swal from "sweetalert2";

export default function AssignedCustomers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: assignedCustomers = [] } = useQuery({
    queryKey: ["all-assigned-customers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking-with-policy");
      return res.data;
    },
  });

  // console.log(assignedCustomers);

  const updateStatus = useMutation({
    mutationFn: ({ id, status, adminFeedback }) =>
      axiosSecure.patch(`/update-status/${id}`, { status, adminFeedback }),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      Swal.fire("Success!", "Status updated successfully", "success");
    },
  });

  //   update status

  const handleStatusChange = async (id, status) => {
    if (status === "rejected") {
      const { value: feedback } = await Swal.fire({
        title: "Provide Feedback",
        input: "textarea",
        inputLabel: "Rejection Reason",
        inputPlaceholder: "Write your feedback here...",
        inputAttributes: {
          "aria-label": "Type your feedback",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
      });

      if (feedback) {
        updateStatus.mutate({ id, status, adminFeedback: feedback });
      }
    } else {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Change status to ${status}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
      });

      if (result.isConfirmed) {
        updateStatus.mutate({ id, status });
      }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-4 animate-fade-in">
        Assigned Customers
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-xl animate-fade-in-up">
        <table className="min-w-full text-sm bg-white border border-green-300 rounded-lg">
          <thead className="bg-green-200 text-green-800">
            <tr>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Policy</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedCustomers.map((item) => (
              <tr
                key={item._id}
                className="border-t border-green-200 hover:bg-green-50 transition-all duration-300"
              >
                <td className="py-2 px-4">{`${item.firstName} ${item.lastName}`}</td>
                <td className="py-2 px-4">{item.userEmail}</td>
                <td className="py-2 px-4">{item.policyData.policyTitle}</td>
                <td className="py-2 px-4">
                  {item.status.toLowerCase() === "pending" ? (
                    <select
                      defaultValue={item.status.toLowerCase()}
                      className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded"
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                    >
                      <option value="pending" disabled>
                        Pending
                      </option>
                      <option value="active">Active</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <span>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => setSelectedCustomer(item)}
                    className="text-green-700 hover:text-green-900 transition"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <Dialog
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md bg-white rounded-xl shadow-lg p-6">
            <div>
              <img
                src={selectedCustomer?.policyData.imageUrl}
                alt=""
                className="w-full rounded-lg"
              />
            </div>
            <Dialog.Title className="text-lg font-bold text-green-800 mb-2">
              Customer Details
            </Dialog.Title>
            <p>
              <strong>Name:</strong> {selectedCustomer?.firstName}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer?.userEmail}
            </p>
            <p>
              <strong>Policy:</strong>{" "}
              {selectedCustomer?.policyData.policyTitle}
            </p>
            <p>
              <strong>Status:</strong> {selectedCustomer?.status}
            </p>

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
