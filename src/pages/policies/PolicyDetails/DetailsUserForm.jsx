"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { UserIcon, HeartIcon, ShieldIcon } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { AuthContext } from "@/authProvider/AuthProvider";

export default function DetailedUserForm({
  estimatedPremiumMonthly,
  estimatedPremiumAnnul,
  convertedData,
  bookingPolicyId,
  closeModal,
}) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    nidSsn: "",
    occupation: "",
    annualIncome: "",
    employerName: "",

    // Nominee Information

    nomineeFirstName: "",
    nomineeLastName: "",
    nomineeEmail: "",
    nomineePhone: "",
    relationship: "",
    nomineeDateOfBirth: "",
    nomineeAddress: "",
    nomineeOccupation: "",

    // Health Disclosure
    healthConditions: [],
    currentMedications: "",
    familyMedicalHistory: "",
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseFrequency: "",
    additionalHealthInfo: "",
  });
  const axiosSecure = useAxiosSecure();

  // Premium data
  const annulPremium = estimatedPremiumAnnul;
  const monthlyPremium = estimatedPremiumMonthly;

  // Existing user data
  const existingData = convertedData;

  const healthConditions = [
    "Diabetes Type 1",
    "Diabetes Type 2",
    "Heart Disease",
    "High Blood Pressure",
    "High Cholesterol",
    "Cancer (any type)",
    "Stroke",
    "Kidney Disease",
    "Liver Disease",
    "Mental Health Conditions",
    "Depression/Anxiety",
    "Respiratory Issues/Asthma",
    "Arthritis",
    "Thyroid Disorders",
    "Epilepsy",
    "HIV/AIDS",
    "Hepatitis",
    "Other Chronic Conditions",
  ];

  const handleHealthConditionChange = (condition, checked) => {
    setFormData((prev) => ({
      ...prev,
      healthConditions: checked
        ? [...prev.healthConditions, condition]
        : prev.healthConditions.filter((c) => c !== condition),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const bookingUserDetails = {
      bookingPolicyId,
      ...formData,
      convertedData,
      estimatedPremiumAnnul,
      estimatedPremiumMonthly,
      userEmail: user?.email,
      status: "pending",
    };
    

    axiosSecure
      .post("/booking-policy", bookingUserDetails)
      .then((res) => {
        
        if (res.data.insertedId) {
          closeModal();
          toast.success(
            "Thanks for apply!! We will contact you as soon as possible"
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "6px",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: "white",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Premium Information Header */}
      <Card className="bg-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5 text-gray-900" />
            Premium Information
          </CardTitle>
          <CardDescription>
            Your estimated premium costs based on provided information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annual-premium">Estimated Annual Premium</Label>
              <Input
                id="annual-premium"
                value={`$${annulPremium}`}
                readOnly
                className="bg-muted font-semibold text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-premium">Estimated Monthly Premium</Label>
              <Input
                id="monthly-premium"
                value={`$${monthlyPremium}`}
                readOnly
                className="bg-muted font-semibold text-lg"
              />
            </div>
          </div>

          {/* Existing Data Display */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Current Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Badge
                variant="secondary"
                className="justify-center py-2 bg-green-600 text-white"
              >
                Age: {existingData.age}
              </Badge>
              <Badge
                variant="secondary"
                className="justify-center py-2 bg-green-600 text-white"
              >
                Gender: {existingData.gender}
              </Badge>
              <Badge
                variant="secondary"
                className="justify-center py-2 bg-green-600 text-white"
              >
                Coverage: ${existingData.coverageAmount}
              </Badge>
              <Badge
                variant="secondary"
                className="justify-center py-2 bg-green-600 text-white"
              >
                Duration: {existingData.duration}
              </Badge>
              <Badge
                variant="secondary"
                className="justify-center py-2 bg-green-600 text-white"
              >
                Smoker: {existingData.smoker}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Application Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="bg-amber-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Please provide your complete personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  className="border border-white bg-white text-black"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger className="border border-white bg-white text-black">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="space-y-2">
                <label style={labelStyle}>Gender *</label>
                <select
                  style={inputStyle}
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Marital Status</label>
                <select
                  style={inputStyle}
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maritalStatus: e.target.value,
                    }))
                  }
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address *</Label>
              <Input
                className="border border-white bg-white text-black"
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    streetAddress: e.target.value,
                  }))
                }
                placeholder="Enter your street address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                  placeholder="Enter your state"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      zipCode: e.target.value,
                    }))
                  }
                  placeholder="Enter ZIP code"
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Country *</label>
                <select
                  style={inputStyle}
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nidSsn">National ID / SSN *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="nidSsn"
                  value={formData.nidSsn}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nidSsn: e.target.value }))
                  }
                  placeholder="Enter your National ID or SSN"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nationality: e.target.value,
                    }))
                  }
                  placeholder="Enter your nationality"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation *</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      occupation: e.target.value,
                    }))
                  }
                  placeholder="Enter your occupation"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="annualIncome"
                  value={formData.annualIncome}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      annualIncome: e.target.value,
                    }))
                  }
                  placeholder="Enter annual income"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employerName">Employer Name</Label>
                <Input
                  className="border border-white bg-white text-black"
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employerName: e.target.value,
                    }))
                  }
                  placeholder="Enter employer name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nominee Information */}
        <Card className="bg-amber-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Nominee Information
            </CardTitle>
            <CardDescription>
              Please provide details of your nominee/beneficiary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomineeFirstName">Nominee First Name *</Label>
                <Input
                  className="bg-white text-black"
                  id="nomineeFirstName"
                  value={formData.nomineeFirstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineeFirstName: e.target.value,
                    }))
                  }
                  placeholder="Enter nominee's first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeLastName">Nominee Last Name *</Label>
                <Input
                  className="bg-white text-black"
                  id="nomineeLastName"
                  value={formData.nomineeLastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineeLastName: e.target.value,
                    }))
                  }
                  placeholder="Enter nominee's last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomineeEmail">Nominee Email</Label>
                <Input
                  className="bg-white text-black"
                  id="nomineeEmail"
                  type="email"
                  value={formData.nomineeEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineeEmail: e.target.value,
                    }))
                  }
                  placeholder="Enter nominee's email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineePhone">Nominee Phone</Label>
                <Input
                  className="bg-white text-black"
                  id="nomineePhone"
                  type="tel"
                  value={formData.nomineePhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineePhone: e.target.value,
                    }))
                  }
                  placeholder="Enter nominee's phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>Relationship *</label>
                  <select
                    style={inputStyle}
                    value={formData.relationship}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        relationship: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="grandparent">Grandparent</option>
                    <option value="grandchild">Grandchild</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeDateOfBirth">
                  Nominee Date of Birth *
                </Label>
                <Input
                  className="bg-white text-black"
                  id="nomineeDateOfBirth"
                  type="date"
                  value={formData.nomineeDateOfBirth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineeDateOfBirth: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomineeAddress">Nominee Address</Label>
                <Textarea
                  id="nomineeAddress"
                  value={formData.nomineeAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineeAddress: e.target.value,
                    }))
                  }
                  placeholder="Enter nominee's complete address"
                  className="min-h-[80px] bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeOccupation">Nominee Occupation</Label>
                <Input
                  id="nomineeOccupation"
                  className="bg-white text-black"
                  value={formData.nomineeOccupation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nomineeOccupation: e.target.value,
                    }))
                  }
                  placeholder="Enter nominee's occupation"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Disclosure */}
        <Card className="bg-amber-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartIcon className="h-5 w-5" />
              Health Disclosure
            </CardTitle>
            <CardDescription>
              Please provide complete and accurate health information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Do you have or have you ever been diagnosed with any of the
                following conditions? *
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4 bg-white">
                {healthConditions.map((condition, index) => (
                  <div key={index} className="flex items-center space-x-2 ">
                    <Checkbox
                      id={`condition-${index}`}
                      checked={formData.healthConditions.includes(condition)}
                      onCheckedChange={(checked) =>
                        handleHealthConditionChange(condition, checked)
                      }
                      className="border border-blue-700"
                    />
                    <Label
                      htmlFor={`condition-${index}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* lifeStyle info */}
            <div className="space-y-4 ">
              <Label className="text-base font-medium">
                Lifestyle Information
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Label>Smoking Status *</Label>
                  <RadioGroup
                    value={formData.smokingStatus}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, smokingStatus: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="never"
                        id="never-smoked"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="never-smoked">Never smoked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="former"
                        id="former-smoker"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="former-smoker">Former smoker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="current"
                        id="current-smoker"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="current-smoker">Current smoker</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Alcohol Consumption</Label>
                  <RadioGroup
                    value={formData.alcoholConsumption}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        alcoholConsumption: value,
                      }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="none"
                        id="no-alcohol"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="no-alcohol">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="occasional"
                        id="occasional-alcohol"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="occasional-alcohol">Occasional</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="regular"
                        id="regular-alcohol"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="regular-alcohol">Regular</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Exercise Frequency</Label>
                  <RadioGroup
                    value={formData.exerciseFrequency}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        exerciseFrequency: value,
                      }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="none"
                        id="no-exercise"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="no-exercise">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="weekly"
                        id="weekly-exercise"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="weekly-exercise">1-3 times/week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="regular"
                        id="regular-exercise"
                        className="border border-blue-700"
                      />
                      <Label htmlFor="regular-exercise">4+ times/week</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                className="bg-white text-black min-h-[80px]"
                id="currentMedications"
                value={formData.currentMedications}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentMedications: e.target.value,
                  }))
                }
                placeholder="List all current medications, dosages, and reasons for taking them"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyMedicalHistory">
                Family Medical History
              </Label>
              <Textarea
                id="familyMedicalHistory"
                className="bg-white text-black min-h-[80px]"
                value={formData.familyMedicalHistory}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    familyMedicalHistory: e.target.value,
                  }))
                }
                placeholder="Describe any significant medical conditions in your immediate family"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalHealthInfo">
                Additional Health Information
              </Label>
              <Textarea
                id="additionalHealthInfo"
                className="bg-white text-black min-h-[80px]"
                value={formData.additionalHealthInfo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalHealthInfo: e.target.value,
                  }))
                }
                placeholder="Any other health information you think is relevant"
              />
            </div>
          </CardContent>
        </Card>

        {/* Declaration and Submit */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="declaration"
                  className="border border-blue-600"
                  required
                />
                <Label
                  htmlFor="declaration"
                  className="text-sm leading-relaxed"
                >
                  I declare that all information provided above is true,
                  complete, and accurate to the best of my knowledge. I
                  understand that any false or incomplete information may result
                  in the denial of my application or cancellation of my policy.
                  *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  className="border border-blue-600"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions, privacy policy, and
                  authorize the insurance company to verify the information
                  provided. *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="medical-exam"
                  className="border border-blue-600"
                />
                <Label htmlFor="medical-exam" className="text-sm">
                  I consent to undergo a medical examination if required by the
                  insurance company.
                </Label>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Submit Insurance Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
