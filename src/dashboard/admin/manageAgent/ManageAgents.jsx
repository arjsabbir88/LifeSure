import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Swal from "sweetalert2";

const ManageAgents = () => {
  const [tab, setTab] = useState("pending");
  const axiosSecure = useAxiosSecure();

  const { data: agents = [], refetch } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    const confirmText =
      status === "active"
        ? "Yes, active!"
        : status === "rejected"
        ? "Yes, reject!"
        : "Yes, demote!";
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmText,
      confirmButtonColor: "#16a34a",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/agents/${id}`, { status });
      refetch();
      Swal.fire("Updated!", `Agent status changed to ${status}.`, "success");
    }
  };

  const pendingAgents = agents.filter(
    (a) => a.status.toLowerCase() === "pending"
  );
  const approvedAgents = agents.filter(
    (a) => a.status.toLowerCase() === "active"
  );

  const renderAgentCard = (agent, isApproved = false) => (
    <Card key={agent._id} className="w-full bg-green-50 shadow-md">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-4">
          <img
            src={agent.image}
            alt={agent.fullName}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-xl font-bold text-green-900">
              {agent.fullName}
            </h3>
            <p className="text-sm text-gray-600">{agent.email}</p>
            <p className="text-sm text-gray-600">{agent.phone}</p>
          </div>
        </div>

        <div className="text-sm text-green-800">
          <p>
            <strong>Experience:</strong> {agent.experience}
          </p>
          <p>
            <strong>Specialization:</strong> {agent.specialization}
          </p>
          <p>
            <strong>About:</strong> {agent.about}
          </p>
          <a
            href={agent.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        </div>

        <div className="flex gap-2 mt-3">
          {isApproved ? (
            <Button
              variant="destructive"
              onClick={() => handleStatusChange(agent._id, "demoted")}
            >
              Demote
            </Button>
          ) : (
            <>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleStatusChange(agent._id, "active")}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleStatusChange(agent._id, "rejected")}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex items-center flex-col md:flex-row justify-between mb-5">
        <div>
          <h1 className="text-3xl font-bold">Manage Agents</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-lg">
            Review agent applications and manage current agents
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {pendingAgents.length}
            </div>
            <div className="text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {approvedAgents.length}
            </div>
            <div className="text-muted-foreground">Active Agents</div>
          </div>
        </div>
      </div>
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="bg-green-100">
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          <TabsTrigger value="approved">Active Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingAgents.length ? (
              pendingAgents.map((agent) => renderAgentCard(agent))
            ) : (
              <p className="text-gray-500">No pending applications.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedAgents.length ? (
              approvedAgents.map((agent) => renderAgentCard(agent, true))
            ) : (
              <p className="text-gray-500">No approved agents yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageAgents;
