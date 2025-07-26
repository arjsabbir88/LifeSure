import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import moment from "moment";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import EditBlogModal from "./EditBlogModal";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";

const ManageBlogs = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-blogs`);
      return res.data;
    },
  });

  const handleUpdate = async (updatedData) => {
    await axiosSecure
      .put(`/blogs/${updatedData._id}`, updatedData)
      .then((res) => {
        toast.success("Policy Updated Successfully");
        refetch();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      refetch();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6">
        📝 Manage Your Blogs
      </h2>
      <div className="flex md:justify-end my-5">
        <Link
          to="/dashboard/blogs"
          className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
        >
          Add Blog
        </Link>
      </div>

      <div className="overflow-x-auto shadow rounded-lg border border-green-100">
        <table className="min-w-full divide-y divide-green-200 bg-green-50">
          <thead className="bg-green-300 text-green-900">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 text-left font-semibold">Author</th>
              <th className="px-6 py-3 text-left font-semibold">
                Publish Date
              </th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-200">
            {blogs.map((blog, index) => (
              <motion.tr
                key={blog._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-green-100"
              >
                <td className="px-6 py-4">{blog.title}</td>
                <td className="px-6 py-4">{blog.createdBy}</td>
                <td className="px-6 py-4">
                  {moment(blog.publishDate).format("LL")}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-700 hover:bg-green-200"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setEditModalOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-100"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </motion.tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-green-600 font-medium"
                >
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editModalOpen && selectedBlog && (
        <EditBlogModal
          open={editModalOpen}
          blogData={selectedBlog}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBlog(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManageBlogs;
