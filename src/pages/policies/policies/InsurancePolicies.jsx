"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function InsurancePolicies({ insurancePolicies }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const policiesPerPage = 6;
  const categories = [
    "All",
    "whole-life",
    "senior",
    "health",
    "term-life",
    "critical-illness",
    "disability",
    "family",
  ];

  console.log(searchResults);
  // Filter policies based on selected category
  const filteredPolicies = useMemo(() => {
    if (selectedCategory === "All") {
      return insurancePolicies;
    }
    return insurancePolicies.filter(
      (policy) => policy.category === selectedCategory
    );
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPolicies.length / policiesPerPage);
  const startIndex = (currentPage - 1) * policiesPerPage;
  const endIndex = startIndex + policiesPerPage;
  const currentPolicies = filteredPolicies.slice(startIndex, endIndex);

  // Reset to first page when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePolicyClick = (policyId) => {
    // Navigate to policy details page
    // console.log(`Navigate to policy details for ID: ${policyId}`);
    // In a real app, you would use router.push(`/policies/${policyId}`)
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-primary-content py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            Insurance Policies
          </h1>
          <p className="text-center text-lg opacity-90 text-gray-800">
            Find the perfect insurance coverage for your needs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Available Policies</h2>
              <div className="badge badge-success badge-xl px-3 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black">
                {filteredPolicies.length}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="btn btn-outline sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
            </button>
            <div className="relative md:block">
              <SearchBar onResults={(data) => setSearchResults(data)} />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className={`${showFilters ? "block" : "hidden"} sm:block mt-4`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`btn btn-sm ${
                    selectedCategory === category
                      ? "btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
                      : "btn-outline"
                  }`}
                >
                  {category}
                </button>
              ))}
              <div className="relative hidden md:block">
                <SearchBar onResults={(data) => setSearchResults(data)} />
              </div>
            </div>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPolicies.map((policy) => (
            <div
              key={policy._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-base-200"
              onClick={() => handlePolicyClick(policy._id)}
            >
              <figure className="px-4 pt-4">
                <img
                  src={policy.imageUrl || "/placeholder.svg"}
                  alt={policy.policyTitle}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </figure>

              <div className="card-body p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="badge badge-secondary badge-lm px-2">
                    {policy.category}
                  </div>
                  <div className="text-green-700 font-bold text-sm">
                    ${policy.basePremium}/Monthly
                  </div>
                </div>

                <h3 className="card-title text-lg mb-2 line-clamp-2">
                  {policy.policyTitle}
                </h3>

                <p className="text-base-content/70 text-sm mb-3 line-clamp-3">
                  {policy.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <div className="text-xs text-base-content/60">
                    Coverage: ${policy.coverageRange}
                  </div>
                  <Link
                    to={`/policiesDetails/${policy._id}`}
                    className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentPolicies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No policies found</h3>
            <p className="text-base-content/70">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-base-content/70">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredPolicies.length)} of{" "}
              {filteredPolicies.length} policies
            </div>

            <div className="join">
              <button
                className="join-item btn btn-sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`join-item btn btn-sm ${
                      currentPage === page ? "btn-active" : ""
                    }`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="join-item btn btn-sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
