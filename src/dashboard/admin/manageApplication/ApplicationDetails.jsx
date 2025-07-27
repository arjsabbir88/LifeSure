"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Heart,
  Shield,
  Users,
  FileText,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useLocation, useParams } from "react-router";
import Loader from "@/components/Custom/loader/Loader";

// const policyData = {
//   _id: "687bf654391b8c7514123975",
//   bookingPolicyId: "687974ccd97f412811705f01",
//   firstName: "Jessica",
//   lastName: "Martinez",
//   email: "essica.martinez@example.com",
//   phone: "+1-555-222-8888",
//   dateOfBirth: "1991-09-28",
//   gender: "female",
//   maritalStatus: "single",
//   nationality: "American",
//   streetAddress: "78 Broadway Ave",
//   city: "Boston",
//   state: "MA",
//   zipCode: "02101",
//   country: "us",
//   nidSsn: "444-55-6666",
//   occupation: "UX Designer",
//   annualIncome: "82000",
//   employerName: "Pixel Studio",
//   healthConditions: ["High Blood Pressure", "Cancer (any type)"],
//   currentMedications: "",
//   familyMedicalHistory: "Asthma",
//   smokingStatus: "never",
//   alcoholConsumption: "occasional",
//   exerciseFrequency: "regular",
//   additionalHealthInfo: "",
//   nomineeFirstName: "Carlos",
//   nomineeLastName: "Martinez",
//   nomineeEmail: "carlos.m@example.com",
//   nomineePhone: "+1-555-101-2020",
//   relationship: "parent",
//   nomineeDateOfBirth: "1965-03-15",
//   nomineeAddress: "78 Broadway Ave, Boston, MA",
//   nomineeOccupation: "Retired",
//   convertedData: {
//     age: "41",
//     gender: "female",
//     coverageAmount: "80000000",
//     duration: "10 Years",
//     smoker: "yes",
//   },
//   estimatedPremiumAnnul: 1185600,
//   estimatedPremiumMonthly: 98800,
//   status: "pending",
//   userEmail: "tariqulislamkhan88@gmail.com",
//   policyDetails: {
//     _id: "687974ccd97f412811705f01",
//     policyTitle: "Golden Years Health Plan",
//     description:
//       "Specialized insurance plan designed for senior citizens to cover medical expenses in their golden years.",
//     minAge: "60",
//     maximumAge: "80",
//     coverageRange: "300000",
//     basePremium: "700",
//     imageUrl:
//       "https://i.ibb.co/Q7wtkhFf/scott-graham-OQMZw-Nd3-Th-U-unsplash.jpg",
//     category: "senior",
//     createdAt: "2025-07-17T22:10:20.574Z",
//     createdBY: "akhimoni646464@gmail.com",
//     isActive: true,
//     rating: 0,
//   },
// };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default function ApplicationDetails() {
  const axiosSecure = useAxiosSecure();
  const query = useQueryParams();
    const policyId = query.get("bookingId");
  const email = query.get("email");


  const { data: policyData,isLoading } = useQuery({
    queryKey: ["booking-info", email, policyId],
    enabled: !!email && !!policyId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking-with-policy-details`, {
        params: {
          email,
          bookingPolicyId: policyId,
        },
      });
      return res.data;
    },
  });

  if(isLoading){
    return <Loader></Loader>
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Insurance Policy Details
          </h1>
          <p className="text-green-600 text-lg">
            Application ID: {policyData?._id}
          </p>
        </motion.div>

        {/* Status and Policy Overview */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="lg:col-span-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                {policyData.policyDetails.policyTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                {policyData.policyDetails.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Category</p>
                  <p className="text-lg font-bold text-green-800 capitalize">
                    {policyData.policyDetails.category}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">
                    Age Range
                  </p>
                  <p className="text-lg font-bold text-green-800">
                    {policyData.policyDetails.minAge}-
                    {policyData.policyDetails.maximumAge}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">
                    Base Premium
                  </p>
                  <p className="text-lg font-bold text-green-800">
                    ${policyData.policyDetails.basePremium}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Coverage</p>
                  <p className="text-lg font-bold text-green-800">
                    $
                    {Number.parseInt(
                      policyData.policyDetails.coverageRange
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <Badge
                className={`text-lg px-4 py-2 mb-4 ${getStatusColor(
                  policyData.status
                )}`}
              >
                {policyData.status.toUpperCase()}
              </Badge>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Premium</span>
                  <span className="font-bold text-green-700">
                    {formatCurrency(policyData.estimatedPremiumMonthly / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Annual Premium</span>
                  <span className="font-bold text-green-700">
                    {formatCurrency(policyData.estimatedPremiumAnnul / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coverage Amount</span>
                  <span className="font-bold text-green-700">
                    {formatCurrency(
                      Number.parseInt(policyData.convertedData.coverageAmount) /
                        100
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">
                      {policyData.firstName} {policyData.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-semibold">
                      {formatDate(policyData.dateOfBirth)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{policyData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{policyData.phone}</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-green-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold capitalize">
                    {policyData.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marital Status</p>
                  <p className="font-semibold capitalize">
                    {policyData.maritalStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nationality</p>
                  <p className="font-semibold">{policyData.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SSN</p>
                  <p className="font-semibold">{policyData.nidSsn}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address & Employment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-green-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">
                    {policyData.streetAddress}
                    <br />
                    {policyData.city}, {policyData.state} {policyData.zipCode}
                    <br />
                    {policyData.country.toUpperCase()}
                  </p>
                </div>
              </div>
              <Separator className="bg-green-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Occupation</p>
                    <p className="font-semibold">{policyData.occupation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Annual Income</p>
                    <p className="font-semibold">
                      {formatCurrency(Number.parseInt(policyData.annualIncome))}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employer</p>
                <p className="font-semibold">{policyData.employerName}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Information */}
        <motion.div variants={itemVariants}>
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Health Conditions
                  </p>
                  <div className="space-y-2">
                    {policyData.healthConditions.map((condition, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-red-200 text-red-700"
                      >
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Family Medical History
                  </p>
                  <Badge
                    variant="outline"
                    className="border-orange-200 text-orange-700"
                  >
                    {policyData.familyMedicalHistory}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Smoking Status</p>
                    <p className="font-semibold capitalize">
                      {policyData.smokingStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Alcohol Consumption</p>
                    <p className="font-semibold capitalize">
                      {policyData.alcoholConsumption}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Exercise Frequency</p>
                    <p className="font-semibold capitalize">
                      {policyData.exerciseFrequency}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nominee Information */}
        <motion.div variants={itemVariants}>
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Nominee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Nominee Name</p>
                    <p className="font-semibold">
                      {policyData.nomineeFirstName} {policyData.nomineeLastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Relationship</p>
                    <p className="font-semibold capitalize">
                      {policyData.relationship}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-semibold">
                      {formatDate(policyData.nomineeDateOfBirth)}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{policyData.nomineeEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{policyData.nomineePhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Occupation</p>
                    <p className="font-semibold">
                      {policyData.nomineeOccupation}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">{policyData.nomineeAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coverage Details */}
        <motion.div variants={itemVariants}>
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Coverage Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium mb-2">Age</p>
                  <p className="text-2xl font-bold text-green-800">
                    {policyData.convertedData.age}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    Duration
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    {policyData.convertedData.duration}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    Coverage Amount
                  </p>
                  <p className="text-xl font-bold text-green-800">
                    {formatCurrency(
                      Number.parseInt(policyData.convertedData.coverageAmount) /
                        100
                    )}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    Smoker Status
                  </p>
                  <p className="text-2xl font-bold text-green-800 capitalize">
                    {policyData.convertedData.smoker}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center py-6">
          <p className="text-green-600">
            Application submitted by: {policyData.userEmail}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Policy created on: {formatDate(policyData.policyDetails.createdAt)}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
