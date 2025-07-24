import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Trash2,
  UserPlus2,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function ManageUser() {
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-info");
      return res.data;
    },
  });

  const handlePromote = async (_id, role) => {
    try {
      await axiosSecure.patch(`/users/promote/${_id}`, { role });
      toast.success(`Your role now ${role}`)
      refetch();
    } catch (err) {
      console.error("Promotion failed", err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axiosSecure.delete(`/users/${_id}`);
      refetch();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredUsers = users.filter((userRole) =>
    filter === "all" ? true : userRole.role.toLowerCase() === filter
  );

  return (
    <section className="p-4 md:p-8 bg-green-50 min-h-screen">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-green-800">User Management</h2>
        <p className="text-green-600">Manage all platform users efficiently</p>
      </div>

      <div className="flex justify-end mb-4 gap-2">
        {["all", "customer", "agent", "admin"].map((role) => (
          <Button
            key={role}
            variant={filter === role ? "default" : "outline"}
            onClick={() => setFilter(role)}
            className="capitalize"
          >
            {role}
          </Button>
        ))}
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
                  <tr key={user._id} className="hover:bg-green-50">
                    <td className="px-4 py-3 text-sm flex items-center gap-2">
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm capitalize">{user.role}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex gap-2 items-center flex-wrap">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white capitalize"
                          >
                            {user.role}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {user.role.toLowerCase() !== "admin" && (
                            <DropdownMenuItem
                              onClick={() => handlePromote(user._id, "admin")}
                            >
                              Make Admin
                            </DropdownMenuItem>
                          )}
                          {user.role.toLowerCase() !== "agent" && (
                            <DropdownMenuItem
                              onClick={() => handlePromote(user._id, "agent")}
                            >
                              Make Agent
                            </DropdownMenuItem>
                          )}
                          {user.role.toLowerCase() !== "customer" && (
                            <DropdownMenuItem
                              onClick={() => handlePromote(user._id, "customer")}
                            >
                              Make Customer
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
