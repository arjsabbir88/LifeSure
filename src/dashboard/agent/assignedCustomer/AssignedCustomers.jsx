import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, ChevronDown } from "lucide-react";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function AssignedCustomers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: assignedCustomers = [] } = useQuery({
    queryKey: ["all-assigned-customers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-assigned-customers");
      return res.data;
    },
  });

  console.log(assignedCustomers)

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-4 animate-fade-in">Assigned Customers</h2>

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
              <tr key={item._id} className="border-t border-green-200 hover:bg-green-50 transition-all duration-300">
                <td className="py-2 px-4">{item.customerName}</td>
                <td className="py-2 px-4">{item.customerEmail}</td>
                <td className="py-2 px-4">{item.policyTitle}</td>
                <td className="py-2 px-4">
                  <select
                    defaultValue={item.applicationStatus}
                    className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded"
                    onChange={(e) => console.log("Update status to:", e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
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
      <Dialog open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md bg-white rounded-xl shadow-lg p-6">
            <Dialog.Title className="text-lg font-bold text-green-800 mb-2">Customer Details</Dialog.Title>
            <p><strong>Name:</strong> {selectedCustomer?.customerName}</p>
            <p><strong>Email:</strong> {selectedCustomer?.customerEmail}</p>
            <p><strong>Policy:</strong> {selectedCustomer?.policyTitle}</p>
            <p><strong>Status:</strong> {selectedCustomer?.applicationStatus}</p>

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
