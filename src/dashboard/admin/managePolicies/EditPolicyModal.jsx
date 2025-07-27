import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";

const EditPolicyModal = ({ isOpen, onClose, policy, onSubmit }) => {
  const [formData, setFormData] = useState({
    policyTitle: "",
    description: "",
    minAge: "",
    maximumAge: "",
    coverageRange: "",
    basePremium: "",
    imageUrl: "",
    category: "",
  });
  const [ImagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (policy) {
      setFormData({
        policyTitle: policy.policyTitle,
        description: policy.description,
        minAge: policy.minAge,
        maximumAge: policy.maximumAge,
        coverageRange: policy.coverageRange,
        basePremium: policy.basePremium,
        imageUrl: policy.imageUrl,
        category: policy.category,
      });
      setImagePreview(policy.imageUrl);
    }
  }, [policy]);

  const handlePhotoUpload = async (e) => {
    
    const image = e.target.files[0];
    if (!image) return;

    const form = new FormData();
    form.append("image", image);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_PHOTOUPLOADE_KEY
        }`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();

      if (data.success) {
        const uploadedUrl = data.data.url;
        

        // ✅ Update both preview and formData.imageUrl
        setImagePreview(uploadedUrl);
        setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      } else {
        console.error("Upload failed:", data);
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An unexpected error occurred during image upload.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
 
  onSubmit(policy._id, formData);
  onClose();
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-green-700 hover:text-red-500"
              onClick={onClose}
            >
              <X />
            </button>
            <div className="my-5 p-4 flex justify-center items-center">
              <img
                className="rounded-lg w-[420px] h-[270px]"
                src={ImagePreview ? ImagePreview : policy.imageUrl}
                alt=""
              />
            </div>
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              ✏️ Edit Policy
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label>Police title</label>
                  <input
                    type="text"
                    name="policyTitle"
                    value={formData.policyTitle}
                    onChange={handleChange}
                    placeholder="Policy Title"
                    className="input-field border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Category(readOnly)</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="input-field border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label>Minmum age</label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleChange}
                    placeholder="Minimum Age"
                    className="input-field border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label> Maximum Age</label>
                  <input
                    type="number"
                    name="maximumAge"
                    value={formData.maximumAge}
                    onChange={handleChange}
                    placeholder="Maximum Age"
                    className="input-field border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Coverage Range</label>
                  <input
                    type="number"
                    name="coverageRange"
                    value={formData.coverageRange}
                    onChange={handleChange}
                    placeholder="Coverage Range"
                    className="input-field border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Base Premium</label>
                  <input
                    type="number"
                    name="basePremium"
                    value={formData.basePremium}
                    onChange={handleChange}
                    placeholder="Base Premium"
                    className="input-field border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                  />
                </div>
                <div className="flex flex-col col-span-full">
                  <label>Image</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="Image URL"
                      className="input-field w-full border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                    />
                    {/* <input type="file" accept="image/*"/> */}
                    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 transition-colors hover:text-green-500 hover:cursor-pointer">
                      <Upload className="mx-auto text-gray-400 hover:text-green-500 hover:cursor-pointer" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Policy Description"
                  rows={3}
                  className="input-field w-full border outline-1 border-green-400 py-3 pl-2 rounded-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
              >
                Save Changes
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditPolicyModal;
