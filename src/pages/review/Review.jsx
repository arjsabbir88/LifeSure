import { use, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/authProvider/AuthProvider";
import { toast } from "sonner";

const Review = () => {
  const { user, loading } = useContext(AuthContext);
  const { displayName, email, photoURL } = user;

  if (loading) {
    return <p>Loading......</p>;
  }

  const [success, setSuccess] = useState(null);
  const [reviewData, setReviewData] = useState({
    name: displayName,
    image: photoURL,
    rating: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const { name, image, rating, message } = reviewData;
    if (!name || !image || !rating || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/reviews", {
        ...reviewData,
        createdAt: new Date(),
      });
      console.log(response.data);

      toast.success("Thanks for submitting your review!");
      setSuccess("Thanks for your review! It has been submitted successfully.");
      setReviewData({ name: "", image: "", rating: "", message: "" });

    } catch (error) {

      console.error("Error submitting review:", error);
      toast.error("Something went wrong! Please try again.");
      setSuccess("Something went wrong! Try again later.");
    }
  };

  return (
    <div className="flex justify-between items-center min-h-screen">
      <div className="max-w-xl md:w-lg lg:w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Submit a Review
        </h2>

        {success && (
          <p className="text-green-600 text-center mb-2">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={reviewData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={reviewData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="https://i.pravatar.cc/150?img=3"
            
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Rating (1 to 5) *
            </label>
            <input
              type="number"
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.5"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="4.5"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Message *
            </label>
            <textarea
              name="message"
              value={reviewData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Write your review here..."
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
