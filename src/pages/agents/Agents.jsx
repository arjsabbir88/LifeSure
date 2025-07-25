import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AllAgents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agents = [] } = useQuery({
    queryKey: ["all-approved-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data.filter((agent) => agent.status === "active");
    },
  });

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-900">All Active Agents</h2>
        <p>
          Meet our trusted agents working actively across all insurance sectors.
        </p>
      </div>
      <div className="flex justify-start md:justify-end my-5">
        <Link
          to="/agent-application"
          className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
        >
          Apply For Agent
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-11/12 mx-auto">
        {agents.map((agent) => (
          <Card
            key={agent._id}
            className="bg-white shadow-md hover:shadow-lg transition-all"
          >
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={agent.image}
                  alt={agent.fullName}
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-green-800">
                    {agent.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">{agent.email}</p>
                  <p className="text-sm text-gray-600">{agent.phone}</p>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Experience:</strong> {agent.experience}
                </p>
                <p>
                  <strong>Specialization:</strong> {agent.specialization}
                </p>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                asChild
              >
                <a
                  href={agent.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {!agents.length && (
        <p className="text-center text-gray-500 mt-10">
          No active agents found.
        </p>
      )}
    </div>
  );
};

export default AllAgents;
