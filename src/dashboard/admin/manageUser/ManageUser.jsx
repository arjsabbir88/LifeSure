import { useContext, useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/authProvider/AuthProvider";

export default function ManageUser() {
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)
  const userAuthInfo = user;
  console.log(userAuthInfo)

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-info");
      return res.data;
    },
  });

  console.log(users);
  const handlePromote = async (id) => {
    try {
      await axios.patch(`/api/users/promote/${id}`);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role: "agent" } : user))
      );
    } catch (err) {
      console.error("Promotion failed", err);
    }
  };

  const handleDemote = async (id) => {
    try {
      await axios.patch(`/api/users/demote/${id}`);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role: "customer" } : user
        )
      );
    } catch (err) {
      console.error("Demotion failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredUsers = users.filter((userRole) =>
    filter === "all" ? true : userRole.role === filter
  );

  return (
    <section className="p-4 md:p-8 bg-green-50 min-h-screen">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-green-800">User Management</h2>
        <p className="text-green-600">Manage all platform users efficiently</p>
      </div>

      <div className="flex justify-end mb-4 gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "customer" ? "default" : "outline"}
          onClick={() => setFilter("customer")}
        >
          Customer
        </Button>
        <Button
          variant={filter === "agent" ? "default" : "outline"}
          onClick={() => setFilter("agent")}
        >
          Agent
        </Button>
        <Button
          variant={filter === "admin" ? "default" : "outline"}
          onClick={() => setFilter("admin")}
        >
          Admin
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-x-auto shadow-xl border-green-200">
          <CardContent className="p-0">
            <table className="min-w-full table-auto">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Registration Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-green-50">
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm capitalize">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex gap-2 items-center flex-wrap">
                      {user.role === "customer" && (
                        <Button
                          size="sm"
                          onClick={() => handlePromote(user.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <ArrowUpRight className="w-4 h-4 mr-1" /> Promote
                        </Button>
                      )}
                      {user.role === "agent" && (
                        <Button
                          size="sm"
                          onClick={() => handleDemote(user.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          <ArrowDownLeft className="w-4 h-4 mr-1" /> Demote
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
