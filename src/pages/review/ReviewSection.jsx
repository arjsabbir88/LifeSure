import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((res) => setReviews(res.data));
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <p className="text-gray-600">What our clients are saying</p>
        </div>

        <Marquee gradient={true} speed={50} pauseOnHover={true}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center w-[300px] mx-4"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 border"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h3>
              <div className="text-yellow-400 mb-2">
                {"★".repeat(Math.round(review.rating))}
                {"☆".repeat(5 - Math.round(review.rating))}
              </div>
              <p className="text-gray-600 text-sm">"{review.message}"</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ReviewSection;
