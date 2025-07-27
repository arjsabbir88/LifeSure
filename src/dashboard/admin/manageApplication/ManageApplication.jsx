import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Eye, XCircle } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      
      const res = await axiosSecure.get("/booking-with-policy");
      return res.data;
    },
  });

  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

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

  //   assigned agent

  const assignAgent = useMutation({
    mutationFn: ({ id, assignedAgent }) =>
      axiosSecure.patch(`/assign-agent/${id}`, { assignedAgent }),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      Swal.fire("Success!", "Policy assigned successfully", "success");
    },
  });

  const handleAssignAgent = async (id, agentId) => {
    console.log(id, agentId);
    const agent = agents.find((a) => a._id === agentId);
    if (!agent) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Assign policy to ${agent.fullName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, assign!",
    });

    if (result.isConfirmed) {
      assignAgent.mutate({
        id,
        assignedAgent: {
          agentId: agent._id,
          name: agent.fullName,
          email: agent.email,
        },
      });
    }
  };

  const handleView = (app) => {
    setSelectedApp(app);
    navigate(
      `/dashboard/manage-application/${app._id}?bookingId=${app.bookingPolicyId}&email=${app.email}`
    );
  };

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <h2 className="text-2xl font-bold text-green-900">
        🧾 Manage Applications
      </h2>

      {isLoading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow-sm">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Policy</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const createdAt = app.date
                  ? new Date(app.date)
                  : new Date(parseInt(app._id.substring(0, 8), 16) * 1000);

                return (
                  <tr key={app._id} className="border-b hover:bg-green-50">
                    <td className="p-2">{`${app.firstName} ${app.lastName}`}</td>
                    <td className="p-2">{app.email}</td>
                    <td className="p-2">{app.policyData.policyTitle}</td>
                    <td className="p-2">{createdAt.toLocaleDateString()}</td>
                    <td className="p-2 font-semibold text-green-700">
                      {app.status.toLowerCase() === "pending" ? (
                        <select
                          defaultValue={app.status.toLowerCase()}
                          className="text-sm border px-2 py-1 rounded bg-white text-black"
                          onChange={(e) =>
                            handleStatusChange(app._id, e.target.value)
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
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="p-2 space-x-2">
                      <select
                        className="text-sm border px-2 py-1 rounded bg-white"
                        value={app.assignedAgent || ""}
                        disabled={!!app.assignedAgent || app.status === 'rejected' || app.status.toLowerCase() ==='pending'} // disable if agent is already assigned
                        onChange={(e) =>
                          handleAssignAgent(app._id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Assign Agent
                        </option>
                        {agents.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.fullName}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleView(app)}
                        className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
