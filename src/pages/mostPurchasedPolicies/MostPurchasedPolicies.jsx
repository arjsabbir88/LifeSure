import React from "react";
import { Link } from "react-router";

const MostPurchasedPolicies = ({ mostPurchased }) => {

    const policies = mostPurchased;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title and description */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Most Purchased Policies
        </h2>
        <p className="mt-2 text-gray-600">
          Explore our top-selling insurance plans trusted by thousands.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => (
          <Link
            to={`/policiesDetails/${policy.policyId}`}
            key={policy.policyId}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
              <img
                src={policy.image}
                alt={policy.name}
                className="object-cover w-full h-[220px] hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{policy.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{policy.category.replace(/-/g, " ")}</p>

              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>
                  <strong>Coverage:</strong> ${Number(policy.coverageRange).toLocaleString()}
                </span>
                <span>
                  <strong>Term:</strong> {policy.premium} / month
                </span>
              </div>

              <div className="mt-3 text-sm font-medium text-green-700">
                Popularity: {policy.totalBookings} {policy.totalBookings === 1 ? "purchase" : "purchases"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MostPurchasedPolicies;
