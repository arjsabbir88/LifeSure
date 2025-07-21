import { useContext, useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import imgage from "./animated.gif";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/authProvider/AuthProvider";
import { toast } from "sonner";

const AddBlogs = () => {
  const { user, loading } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
  });

  const axiosSecure = useAxiosSecure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=e5428105f9e1d68d8a0128f5badc4ce3",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Uploaded Image URL:", data.data.url);
        setImagePreview(data.data.url);
        setImageUrl(data.data.url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const blogData = {
      ...formData,
      image: imageUrl,
      createdBy: user?.email,
      createdAt: new Date().toISOString(),
    };

    console.log(blogData);

    axiosSecure
      .post("/blogs", blogData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Blogs Posted Successfully");
          setFormData({
            title: "",
            summary: "",
            content: "",
          });
          setImageUrl(null);
          setImagePreview(null);
        }
      })
      .catch((err) => {
        console.log(err.message)
        toast.error(err.message)
      });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Post New Blog
        </h2>
        <p className="text-gray-600">Empowering you through knowledge</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center bg-white  p-6 shadow-lg rounded-2xl">
        {/* Left Side - Animation/Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <motion.img
            src={imgage}
            alt="Blog Illustration"
            className="w-full h-auto object-cover"
            animate={{
              y: [0, -10, 0], // bounce up then back down
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Side - Form */}
        <motion.form
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <textarea
            name="summary"
            placeholder="Short Summary"
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            rows={2}
            value={formData.summary}
            onChange={handleInputChange}
            required
          />

          <textarea
            name="content"
            placeholder="Write your blog content..."
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            rows={5}
            value={formData.content}
            onChange={handleInputChange}
            required
          />

          {/* Custom File Input */}
          <label className="w-full flex items-center justify-center gap-3 p-3 bg-blue-50 border border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition">
            <UploadCloud className="w-6 h-6 text-green-600" />
            <span className="text-sm text-green-700 font-medium">
              Choose Image
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
              required
            />
          </label>

          {/* Preview Image */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md shadow-md"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 hover:cursor-pointer text-white font-semibold transition"
          >
            Publish Blog
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default AddBlogs;
