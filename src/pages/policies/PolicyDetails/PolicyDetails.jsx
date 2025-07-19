"use client";

import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import DetailedUserForm from "./DetailsUserForm";

// Sample policy data based on your database structure
// const policyData = {
//   _id: "687640d770da2d169d48c028",
//   policyTitle: "Senior Protection Plan",
//   category: "senior",
//   description: "Specially designed for senior citizens. Offers peace of mind and financial support during retirement.",
//   premium: "420",
//   coverageRange: "200000",
//   minAge: "50",
//   maximumAge: "75",
//   durations: ["5 Years", "10 Years"],
//   imageUrl: "https://i.ibb.co/sJFmFvxS/top-view-hands-with-paper-cut-family.jpg",
//   createdAt: "2025-07-15T11:51:51.132Z",
//   createdBY: "akhimoni646464@gmail.com",

//   // Additional policy details
//   eligibility: [
//     "Age between 50-75 years",
//     "Indian citizen or NRI",
//     "No pre-existing medical conditions (subject to medical examination)",
//     "Annual income proof required",
//     "Valid identity and address proof",
//   ],
//   benefits: [
//     "Comprehensive health coverage up to ₹2,00,000",
//     "Cashless treatment at 5000+ network hospitals",
//     "Pre and post hospitalization expenses covered",
//     "Day care procedures included",
//     "Annual health check-up",
//     "Emergency ambulance services",
//     "No co-payment for senior citizens",
//     "Lifetime renewability",
//   ],
//   premiumCalculation: {
//     baseAmount: 420,
//     factors: [
//       "Age of the policyholder",
//       "Selected coverage amount",
//       "Policy duration",
//       "Medical history",
//       "Lifestyle factors (smoking, drinking)",
//       "Geographic location",
//     ],
//     discounts: [
//       "Family floater discount: 10%",
//       "Online purchase discount: 5%",
//       "No-claim bonus: Up to 20%",
//       "Long-term policy discount: 15%",
//     ],
//   },
//   exclusions: [
//     "Pre-existing diseases (first 2 years)",
//     "Cosmetic surgery",
//     "Dental treatment (unless due to accident)",
//     "War and nuclear risks",
//     "Self-inflicted injuries",
//     "Pregnancy-related expenses",
//   ],
//   claimProcess: [
//     "Inform insurance company within 24 hours",
//     "Submit required documents",
//     "Medical examination if required",
//     "Claim processing within 15 days",
//     "Settlement through NEFT/RTGS",
//   ],
// }

export default function PolicyDetails() {
  const policyData = useLoaderData() || [];
  const bookingPolicyId = policyData._id;
  console.log(bookingPolicyId);



  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(
    policyData.durations[0]
  );
  const [estimatedPremiumAnnul, setEstimatedPremiumAnnul] = useState(0);
  const [estimatedPremiumMonthly, setEstimatedPremiumMonthly] = useState(0);
  const [convertedData, setConvertedData] = useState({})

  console.log("policyData.durations", policyData.durations);

  // const handleGetQuote = () => {
  //   // Redirect to quote page
  //   console.log("Redirecting to quote page...");
  //   // window.location.href = "/quote"
  // };

  const handleBookConsultation = () => {
    // Redirect to agent consultation booking
    console.log("Redirecting to agent consultation...");
    // window.location.href = "/book-consultation"
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // premium estimate form submission handler

  const handlePremiumEstimate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const convertedDataEstimate = Object.fromEntries(formData.entries());
    setConvertedData(convertedDataEstimate)
    console.log("premium estimate data", convertedDataEstimate);
    const { age, coverageAmount, duration, smoker } = convertedDataEstimate;

    console.log(age, coverageAmount, duration, smoker);

    // Coverage Amount: $20,00,000
    // Rate per 1000 coverage: $8
    // Age Factor: 1.5 (for age 40+)
    // Smoker Factor: 1.3 (if smoker)
    // Duration Factor: 0.95 (if 20+ years for discount)

    const rateCoverage = 8;
    const ageFactor = age >= 40 ? 1.5 : 1;
    const smokerFactor = smoker === "yes" ? 1.3 : 1;
    const durationFactor = duration.includes("10") ? 0.95 : 1;

    // console.log(rateCoverage, ageFactor, smokerFactor, durationFactor)

    const basePremium = (coverageAmount / 1000) * rateCoverage;
    const premiumAnnul =
      basePremium * ageFactor * smokerFactor * durationFactor;
    const premiumMonthly = Math.ceil(premiumAnnul / 12);
    console.log(premiumAnnul, premiumMonthly);

    setEstimatedPremiumAnnul(premiumAnnul);
    setEstimatedPremiumMonthly(premiumMonthly);

    document.getElementById("my_modal_3").close();
    form.reset();
    document.getElementById("my_modal_4").showModal();
  };

  return (
    <div className="min-h-screen bg-green-100">
      {/* Hero Section */}
      <div className="hero min-h-96 bg-gradient-to-r from-green-600 to-green-400">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-4xl">
            <div className="badge badge-lg mb-4 capitalize px-4 font-bold">
              {policyData.category} Plan
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">
              {policyData.policyTitle}
            </h1>
            <p className="text-xl mb-6 opacity-90 text-gray-600">
              {policyData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-soft btn-lg hover:scale-105 transition-transform hover:bg-transparent hover:text-green-800"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Get Quote Now
              </button>
              <button
                className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-green-800 hover:scale-105 transition-all"
                onClick={handleBookConsultation}
              >
                Book Agent Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Policy Overview */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Policy Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Coverage Amount</div>
                    <div className="stat-value text-black">
                      {formatCurrency(policyData.coverageRange)}
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Monthly Premium</div>
                    <div className="stat-value text-black">
                      {formatCurrency(policyData.basePremium)}
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Age Range</div>
                    <div className="stat-value text-black">
                      {policyData.minAge} - {policyData.maximumAge} years
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Policy Duration</div>
                    <div className="stat-value text-info grid grid-cols-3 gap-3">
                      {policyData.durations?.map((duration, index) => (
                        <span
                          key={index}
                          className="badge badge-success px-2 text-black font-medium"
                        >
                          {duration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  Eligibility Criteria
                </h2>
                <div className="space-y-3">
                  {policyData.extraData.eligibility.map((criteria, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="badge badge-success badge-sm mt-1">✓</div>
                      <span>{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {policyData.extraData.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-base-200 rounded-lg"
                    >
                      <div className="badge badge-success badge-sm ">★</div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Calculation */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  Premium Calculation
                </h2>

                <div className="alert bg-gradient-to-r from-green-600 to-green-400 mb-4">
                  <span>
                    Base Premium: {formatCurrency(policyData.basePremium)} per
                    month
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Factors Affecting Premium:
                    </h3>
                    <ul className="space-y-2">
                      {policyData.extraData.premiumCalculation.factors.map(
                        (factor, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="text-sm">{factor}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Available Discounts:
                    </h3>
                    <ul className="space-y-2">
                      {policyData.extraData.premiumCalculation.discounts.map(
                        (discount, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="badge badge-success badge-xs"></span>
                            <span className="text-sm">{discount}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Policy Exclusions</h2>
                <div className="alert alert-warning mb-4">
                  <span>Please read the following exclusions carefully</span>
                </div>
                <div className="space-y-3">
                  {policyData.extraData.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="badge badge-error badge-sm mt-1">✗</div>
                      <span>{exclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Claim Process */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Claim Process</h2>
                <div className="steps steps-vertical lg:steps-horizontal">
                  {policyData.extraData.claimProcess.map((step, index) => (
                    <div key={index} className="step step-primary">
                      <div className="text-left">
                        <div className="font-semibold">Step {index + 1}</div>
                        <div className="text-sm opacity-70">{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Policy Image */}
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={policyData.imageUrl || "/placeholder.svg"}
                  alt={policyData.policyTitle}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </figure>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    className="btn btn-success btn-block bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
                    // onClick={handleGetQuote}
                  >
                    🔍 Get Instant Quote
                  </button>
                  <button
                    className="btn btn-success btn-block bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black hover:scale-105 transition-transform"
                    onClick={handleBookConsultation}
                  >
                    📞 Book Agent Consultation
                  </button>
                  <button className="btn btn-outline btn-block">
                    📄 Download Brochure
                  </button>
                  <button className="btn btn-outline btn-block ">
                    ❓ FAQ & Support
                  </button>
                </div>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Select Duration</h3>
                <div className="space-y-2">
                  {policyData.durations.map((duration) => (
                    <label key={duration} className="cursor-pointer label">
                      <span className="label-text text-green-800">
                        {duration}
                      </span>
                      <input
                        type="radio"
                        name="duration"
                        className="radio radio-success"
                        checked={selectedDuration === duration}
                        onChange={() => setSelectedDuration(duration)}
                      />
                    </label>
                  ))}
                </div>
                <div className="alert alert-info mt-4 bg-gradient-to-r from-green-600 to-green-400">
                  <span className="text-sm font-bold text-black">
                    Selected: {selectedDuration}
                  </span>
                </div>
              </div>
            </div>

            {/* Policy Info */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Policy Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold">Created:</span>
                    <br />
                    <span className="opacity-70">
                      {formatDate(policyData.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Policy ID:</span>
                    <br />
                    <span className="opacity-70 font-mono text-xs">
                      {policyData._id}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Category:</span>
                    <br />
                    <span className="badge badge-success px-4 text-black font-semibold capitalize">
                      {policyData.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="card bg-gradient-to-r from-green-700 to-green-400 text-black-content shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center mb-2">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Our insurance experts are here to help you
                </p>
                <div className="space-y-2">
                  <div className="text-sm">📞 1800-123-4567</div>
                  <div className="text-sm">✉️ support@insurance.com</div>
                </div>
                <button className="btn btn-sm mt-4">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* show modal form here */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-600 hover:bg-red-600 hover:text-white">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4 text-center text-primary">
            Get Your Insurance Quote
          </h3>

          <form className="space-y-3" onSubmit={handlePremiumEstimate}>
            {/* Age */}
            <div>
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                name="age"
                type="number"
                placeholder="Enter your age"
                className="input input-bordered w-full"
                min={18}
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select className="select select-bordered w-full " name="gender">
                <option disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Coverage Amount */}
            <div>
              <label className="label">
                <span className="label-text">Coverage Amount ($)</span>
              </label>
              <input
                name="coverageAmount"
                type="number"
                placeholder="e.g. 2000000"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="label">
                <span className="label-text">Duration</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="duration"
                required
              >
                <option disabled selected>
                  Select Duration
                </option>
                {policyData.durations?.map((duration, index) => (
                  <option value={duration} key={index}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>

            {/* Smoker / Non-smoker */}
            <div>
              <label className="label">
                <span className="label-text">Are you a smoker?</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="smoker"
                required
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Submit */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary w-full">
                Estimate Premium
              </button>
            </div>
          </form>
          <h1>Estimated Annul Premium : ${estimatedPremiumAnnul}</h1>
          <h1>Estimated Monthly Premium : ${estimatedPremiumMonthly}</h1>
        </div>
      </dialog>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-6xl min-h-screen max-w-none mx-auto">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-600 hover:bg-red-600 hover:text-white">
              ✕
            </button>
          </form>
          <h1>Hello</h1>
          <DetailedUserForm convertedData={convertedData} estimatedPremiumAnnul={estimatedPremiumAnnul} estimatedPremiumMonthly={estimatedPremiumMonthly} bookingPolicyId={bookingPolicyId}/>
        </div>
      </dialog>
    </div>
  );
}
