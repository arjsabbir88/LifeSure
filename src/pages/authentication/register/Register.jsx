"use client";

import { useContext, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";
import { Link } from "react-router";
import { AuthContext } from "../../../authProvider/AuthProvider";

export default function Register() {
  const { user, createUser, loginWithGoogle, updateUser, setUser, loading } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      console.log("Registration attempt:", formData);
    }

    // call createUser function here
    createUser(formData.email, formData.password)
      .then((res) => {
        console.log("user created successfully", res);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Register Card - Using DaisyUI */}
      <div className="card w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl relative z-10 animate-fade-in-up">
        <div className="card-body">
          {/* Header */}
          <div className="text-center pb-6">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 animate-bounce-slow">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="card-title text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent justify-center">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">Join us today and get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    First Name
                  </span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full pl-10 h-12 transition-all duration-300 hover:border-gray-300 ${
                      errors.firstName ? "input-error" : "focus:input-primary"
                    }`}
                    required
                  />
                </div>
                {errors.firstName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.firstName}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 hover:border-gray-300"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-10 h-12 transition-all duration-300 hover:border-gray-300 ${
                    errors.email ? "input-error" : "focus:input-primary"
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-10 pr-10 h-12 transition-all duration-300 hover:border-gray-300 ${
                    errors.password ? "input-error" : "focus:input-primary"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full pl-10 pr-10 h-12 transition-all duration-300 hover:border-gray-300 ${
                    errors.confirmPassword
                      ? "input-error"
                      : "focus:input-primary"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.confirmPassword}
                  </span>
                </label>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`checkbox checkbox-primary checkbox-sm mr-3 ${
                    errors.agreeToTerms ? "checkbox-error" : ""
                  }`}
                />
                <span className="label-text text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="link link-primary">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="link link-primary">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.agreeToTerms}
                  </span>
                </label>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 border-none text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">Or register with</div>

          {/* Social Register Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-outline h-12 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02]">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </button>
            <button className="btn btn-outline h-12 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02]">
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="link link-primary font-medium">
              Login here
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
