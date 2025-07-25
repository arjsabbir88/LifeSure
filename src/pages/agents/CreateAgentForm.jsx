import { useContext, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/authProvider/AuthProvider";
import Loader from "@/components/Custom/loader/Loader";

const AgentApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    specialization: "",
    resumeLink: "",
    about: "",
  });
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const [imageUrl, setImageUrl] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const imgUrl = imageUrl || user.photoURL;
    const agentData = {
      ...formData,
      image: imgUrl,
      status: "pending",
    };
    console.log("this is agent data", agentData);

    e.preventDefault();
    try {
      const res = await axiosSecure.post("/agent-application", agentData);
      if (res.data.insertedId) {
        toast.success("Application submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          experience: "",
          specialization: "",
          resumeLink: "",
          about: "",
        });
        setImageUrl(null);
      }
      console.log(agentData);
    } catch (error) {
      console.error(error);
      toast.error("Submission failed. Try again.");
    }
  };

  const handlePhotoUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    console.log("handlephotoupload called");

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_PHOTOUPLOADE_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        console.log("Uploaded Image URL:", data.data.url);
        setImageUrl(data.data.url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl min-h-screen mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 border border-green-100">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌿 Apply as an Insurance Agent
      </h2>
      <div className="w-full flex justify-center py-5">
        {imageUrl && (
          <img
            className="h-45 w-45 rounded-full"
            src={imageUrl}
            alt="profile img"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="flex items-center border rounded-lg p-2">
          <User className="text-green-600 mr-2" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-lg p-2">
          <Mail className="text-green-600 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user?.email}
            onChange={handleChange}
            required
            className="w-full focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border rounded-lg p-2">
          <Phone className="text-green-600 mr-2" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full focus:outline-none"
          />
        </div>

        {/* Experience */}
        <div className="flex items-center border rounded-lg p-2">
          <Briefcase className="text-green-600 mr-2" />
          <input
            type="text"
            name="experience"
            placeholder="Years of Experience (e.g. 2 years)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full focus:outline-none"
            required
          />
        </div>

        {/* Specialization */}
        <div className="flex items-center border rounded-lg p-2">
          <FileText className="text-green-600 mr-2" />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g. Family, Health)"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full focus:outline-none"
            required
          />
        </div>

        {/* Resume Link */}
        <div className="flex items-center border rounded-lg p-2">
          <FileText className="text-green-600 mr-2" />
          <input
            type="url"
            name="resumeLink"
            placeholder="Google Drive Resume Link"
            value={formData.resumeLink}
            onChange={handleChange}
            className="w-full focus:outline-none"
            required
          />
        </div>

        {/* About */}
        <textarea
          name="about"
          rows="4"
          placeholder="Tell us about yourself"
          value={formData.about}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 resize-none"
          required
        ></textarea>
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

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg font-semibold transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default AgentApplicationForm;
