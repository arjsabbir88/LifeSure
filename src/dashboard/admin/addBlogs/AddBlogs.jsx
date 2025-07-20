import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import imgage from "./animated.gif";

const AddBlogs = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("summary", formData.summary);
    blogData.append("content", formData.content);
    blogData.append("image", formData.image);

    try {
      await fetch("http://localhost:3000/upload-blog", {
        method: "POST",
        body: blogData,
      });

      alert("Blog posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to post blog.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center bg-white p-6 shadow-lg rounded-2xl">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Post New Blog
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="summary"
            placeholder="Short Summary"
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            rows={2}
            value={formData.summary}
            onChange={handleChange}
            required
          />

          {/* Custom File Input */}
          <label className="w-full flex items-center justify-center gap-3 p-3 bg-blue-50 border border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition">
            <UploadCloud className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">
              Choose Image
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
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

          <textarea
            name="content"
            placeholder="Write your blog content..."
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            rows={5}
            value={formData.content}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Publish Blog
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default AddBlogs;
