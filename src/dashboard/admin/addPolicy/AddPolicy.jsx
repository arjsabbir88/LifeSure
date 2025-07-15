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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  DollarSign,
  Calendar,
  Users,
  Shield,
  FileText,
  ImageIcon,
} from "lucide-react";
import { AuthContext } from "@/authProvider/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

export default function AddPolicy() {
  const [imageUploadType, setImageUploadType] = useState("url");
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleDurationToggle = (duration) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };

  const handleAddPolicySubmit = (e) => {
    e.preventDefault();

    const createdAt = new Date().toISOString();
    const createdBY = user?.email;

    const form = e.target;
    const formData = new FormData(form);
    const convertedData = Object.fromEntries(formData.entries());

    convertedData.durations = selectedDurations;
    convertedData.category = selectedCategory;
    convertedData.createdAt = createdAt;
    convertedData.createdBY = createdBY;
    console.log("form data", convertedData);

    // send data to the server
    axiosSecure
      .post("/policies", convertedData)
      .then((response) => {
        console.log("policy added successfully", response.data);

        if (response.data.insertedId) {
          toast.success("Policy Added Successfully");
          setSelectedDurations([]);
          setSelectedCategory("");
          form.reset();
        }
      })
      .catch((error) => {
        console.log("error adding policy", error);
      });
  };

  const durationOptions = [
    "1 Year",
    "5 Years",
    "10 Years",
    "15 Years",
    "20 Years",
    "25 Years",
    "30 Years",
    "Lifetime",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Insurance Policy Management
          </h1>
          <p className="text-gray-600">
            Create and configure insurance policy details
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Policy Configuration
            </CardTitle>
            <CardDescription className="text-blue-100">
              Fill in the details below to create a new insurance policy
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleAddPolicySubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="policy-title"
                      className="text-sm font-medium"
                    >
                      Policy Title *
                    </Label>
                    <Input
                      id="policy-title"
                      name="policyTitle"
                      placeholder="e.g., Premium Life Insurance Plan"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category *
                    </Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select policy category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="term-life">
                          Term Life Insurance
                        </SelectItem>
                        <SelectItem value="whole-life">
                          Whole Life Insurance
                        </SelectItem>
                        <SelectItem value="senior">Senior Insurance</SelectItem>
                        <SelectItem value="health">Health Insurance</SelectItem>
                        <SelectItem value="disability">
                          Disability Insurance
                        </SelectItem>
                        <SelectItem value="critical-illness">
                          Critical Illness
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of the policy benefits, coverage, and key features..."
                    className="min-h-[120px] resize-none"
                  />
                </div>
              </div>

              {/* Age Requirements */}
              <div className="grid gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Age Requirements
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="min-age" className="text-sm font-medium">
                      Minimum Age *
                    </Label>
                    <Input
                      name="minAge"
                      id="min-age"
                      type="number"
                      placeholder="18"
                      min="0"
                      max="100"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-age" className="text-sm font-medium">
                      Maximum Age *
                    </Label>
                    <Input
                      name="maximumAge"
                      id="max-age"
                      type="number"
                      placeholder="65"
                      min="0"
                      max="100"
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Coverage & Premium */}
              <div className="grid gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Coverage & Premium
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="coverage-range"
                      className="text-sm font-medium"
                    >
                      Coverage Range *
                    </Label>
                    <Input
                      name="coverageRange"
                      id="coverage-range"
                      placeholder="e.g., $50,000 - $1,000,000"
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">
                      Specify the minimum and maximum coverage amounts
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="base-premium"
                      className="text-sm font-medium"
                    >
                      Base Premium Rate *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        name="basePremium"
                        id="base-premium"
                        type="number"
                        placeholder="299.99"
                        step="0.01"
                        className="h-11 pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Monthly premium rate in USD
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration Options */}
              <div className="grid gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Duration Options
                  </h3>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Available Policy Durations *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
                    {durationOptions.map((duration) => (
                      <div
                        key={duration}
                        onClick={() => handleDurationToggle(duration)}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                          selectedDurations.includes(duration)
                            ? "border-green-500 bg-blue-50 text-green-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="text-sm font-medium">{duration}</span>
                      </div>
                    ))}
                  </div>
                  {selectedDurations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-sm text-gray-600">Selected:</span>
                      {selectedDurations.map((duration) => (
                        <Badge
                          key={duration}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {duration}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Policy Image */}
              <div className="grid gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Policy Image
                  </h3>
                </div>

                <Tabs
                  value={imageUploadType}
                  onValueChange={(value) => setImageUploadType(value)}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-2">
                    <Label htmlFor="image-url" className="text-sm font-medium">
                      Image URL
                    </Label>
                    <Input
                      id="image-url"
                      name="imageUrl"
                      type="url"
                      placeholder="https://example.com/policy-image.jpg"
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">
                      Provide a direct link to the policy image
                    </p>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-2">
                    <Label className="text-sm font-medium">Upload Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <Input type="file" className="hidden" accept="image/*" />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 bg-transparent hover:cursor-pointer hover:bg-gradient-to-r from-green-600 to-green-400"
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:cursor-pointer hover:to-green-600"
                >
                  Create Policy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
