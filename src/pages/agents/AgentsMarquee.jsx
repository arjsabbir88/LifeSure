"use client";

import { useState, useEffect } from "react";
import { Star, MapPin, Award } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

// Mock data for demonstration
// const mockAgents = [
//   {
//     _id: "1",
//     fullName: "Sarah Johnson",
//     specialization: "Real Estate Expert",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 4.9,
//     location: "New York, NY",
//     completedProjects: 45,
//     experience: 6,
//     status: "active",
//   },
//   {
//     _id: "2",
//     fullName: "Michael Chen",
//     specialization: "Investment Advisor",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 4.8,
//     location: "San Francisco, CA",
//     completedProjects: 38,
//     experience: 4,
//     status: "active",
//   },
//   {
//     _id: "3",
//     fullName: "Emily Rodriguez",
//     specialization: "Property Manager",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 5.0,
//     location: "Miami, FL",
//     completedProjects: 52,
//     experience: 8,
//     status: "active",
//   },
//   {
//     _id: "4",
//     fullName: "David Thompson",
//     specialization: "Commercial Broker",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 4.7,
//     location: "Chicago, IL",
//     completedProjects: 29,
//     experience: 5,
//     status: "active",
//   },
//   {
//     _id: "5",
//     fullName: "Lisa Wang",
//     specialization: "Luxury Specialist",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 4.9,
//     location: "Los Angeles, CA",
//     completedProjects: 41,
//     experience: 7,
//     status: "active",
//   },
//   {
//     _id: "6",
//     fullName: "Robert Martinez",
//     specialization: "First-Time Buyer Expert",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 4.8,
//     location: "Austin, TX",
//     completedProjects: 33,
//     experience: 3,
//     status: "active",
//   },
// ];

const AgentMarquee = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const { data: mockAgents = [] } = useQuery({
    queryKey: ["all-approved-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  // Simulate data loading
  useEffect(() => {
    const loadAgents = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAgents(mockAgents.filter((agent) => agent.status === "active"));
      setLoading(false);
    };

    loadAgents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Award className="w-4 h-4" />
          Featured Agents
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Meet Our Top
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            {" "}
            Performing Agents
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover our exceptional team of verified agents who are ready to help
          you achieve your goals with their expertise and dedication.
        </p>
      </div>

      {/* Marquee Section */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-emerald-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-emerald-50 to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden whitespace-nowrap py-8">
          <div className="inline-block animate-marquee hover:pause-animation">
            {[...agents, ...agents, ...agents].map((agent, idx) => (
              <div
                key={`${agent._id}-${idx}`}
                className="inline-block mx-3 group cursor-pointer"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl rounded-2xl p-6 w-72 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  {/* Agent Image */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto relative">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.fullName}
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="text-center space-y-2">
                    <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                      {agent.fullName}
                    </h4>

                    <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block truncate max-w-full">
                      {agent.specialization}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(4.9)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {agent.rating}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-center gap-1 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs truncate">{agent.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 pt-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900">
                          {32}
                        </div>
                        <div className="text-xs text-gray-500">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900">
                          {agent.experience}y
                        </div>
                        <div className="text-xs text-gray-500">Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link to="/agents" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
          View All Agents
        </Link>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
           
        }

        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 30s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
};

export default AgentMarquee;
