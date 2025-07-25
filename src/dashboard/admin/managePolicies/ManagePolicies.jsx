// import React from 'react'
// import { Link } from 'react-router'

// const ManagePolicies = () => {
//   return (
//     <div>
//       this is manage policies page
//       <Link to= 'add-policy'
//       className='btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black'>Add Policy</Link>
//     </div>
//   )
// }

// export default ManagePolicies

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import EditPolicyModal from "./EditPolicyModal";

// const fetchPolicies = async () => {
//   const res = await axios.get("/policies");
//   return res.data;
// };

const ManagePolicies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: policies = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies");
      return res.data;
    },
  });

  console.log(policies);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/policies/${id}`);
        Swal.fire("Deleted!", "Policy has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handleEdit = (policy) => {
    setSelectedPolicy(policy);
    // open edit modal here
    setModalOpen(true);
  };

  // handle update API
  const handleUpdate = async (id, updatedData) => {
    try {
      // await axios.put(`/api/policies/${id}`, updatedData);
      Swal.fire("Updated!", "Policy has been updated.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to update.", "error");
    }
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-green-950">
          📄 Manage Policies
        </h1>
        <p className="text-gray-600 mb-6">
          View, edit, or delete your existing insurance policies.
        </p>
      </div>
      <div className="flex md:justify-end my-5">
        <Link
          to="add-policy"
          className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
        >
          Add Policy
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl shadow-sm">
            <thead>
              <tr className="bg-green-300 text-sm text-gray-600">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Coverage</th>
                <th className="p-3 text-left">Premium</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <motion.tr
                  key={policy._id}
                  className="border-t hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3">
                    <img
                      src={policy.imageUrl}
                      alt={policy.policyTitle}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{policy.policyTitle}</td>
                  <td className="p-3">৳{policy.coverageRange}</td>
                  <td className="p-3">৳{policy.basePremium}</td>
                  <td className="p-3">
                    {policy.minAge} - {policy.maximumAge}
                  </td>
                  <td className="p-3 capitalize">{policy.category}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(policy)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(policy._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Optional: Edit modal placeholder */}
      {selectedPolicy && (
        <div>
          <EditPolicyModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            policy={selectedPolicy}
            onSubmit={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ManagePolicies;
