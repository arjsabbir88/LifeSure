import React from "react";
// import { Link } from "react-router";
import { ArrowRight } from "lucide-react"

const SecondButton = ({ path }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button className="group relative px-8 py-2 bg-gradient-to-r from-green-500 via-emerald-500 to-purple-600 hover:from-green-600 hover:via-emerald-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Button content */}
        <div className="relative flex items-center space-x-2 z-10">
          <span className="text-lg">Click Me</span>
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
    </div>
  );
};

export default SecondButton;
