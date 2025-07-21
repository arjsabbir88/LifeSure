"use client"

import { useEffect, useState } from "react"

export default function AnimatedIllustration() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-80 h-80">
        {/* Floating envelope */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative w-full h-full animate-float">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Envelope body */}
              <rect x="40" y="80" width="120" height="80" rx="8" fill="#3B82F6" className="animate-pulse-slow" />

              {/* Envelope flap */}
              <path d="M40 80 L100 120 L160 80" stroke="#1E40AF" strokeWidth="2" fill="none" className="animate-draw" />

              {/* Letter inside */}
              <rect x="55" y="95" width="90" height="50" rx="4" fill="white" className="animate-fade-in-delayed" />

              {/* Letter lines */}
              <line
                x1="65"
                y1="105"
                x2="125"
                y2="105"
                stroke="#6B7280"
                strokeWidth="2"
                className="animate-draw-delayed"
              />
              <line
                x1="65"
                y1="115"
                x2="135"
                y2="115"
                stroke="#6B7280"
                strokeWidth="2"
                className="animate-draw-delayed"
              />
              <line
                x1="65"
                y1="125"
                x2="110"
                y2="125"
                stroke="#6B7280"
                strokeWidth="2"
                className="animate-draw-delayed"
              />
            </svg>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400 rounded-full animate-float-particle opacity-60`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
        
        @keyframes draw {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 100 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: scale(0.8); }
          60% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
        
        .animate-draw {
          stroke-dasharray: 100;
          animation: draw 2s ease-in-out forwards;
          animation-delay: 0.5s;
        }
        
        .animate-draw-delayed {
          stroke-dasharray: 50;
          animation: draw 1.5s ease-in-out forwards;
          animation-delay: 1.5s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}
